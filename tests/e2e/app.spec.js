// اختبارات شاملة للواجهة في متصفح حقيقي (Edge) على نسخة الإنتاج المبنية.
import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

function watchErrors(page) {
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })
  return errors
}

async function setCode(page, scope, text) {
  await scope.locator('.cm-content').first().click()
  await page.keyboard.press('Control+A')
  await page.keyboard.press('Delete')
  await page.keyboard.insertText(text)
}

const ROUTES = ['/', '/learn', '/learn/html-01', '/learn/js-09', '/learn/vue-06', '/review', '/editor', '/explain', '/css-lab', '/js-lab', '/visualizer', '/dictionary', '/dictionary/js-closure', '/practice', '/practice/p-shop-vue', '/settings', '/selftest', '/no-such-page']

test.describe('كل الصفحات', () => {
  for (const vp of [{ name: 'desktop', width: 1400, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
    test(`تُعرض دون أخطاء (${vp.name})`, async ({ page }) => {
      await page.setViewportSize(vp)
      const errors = watchErrors(page)
      for (const r of ROUTES) {
        await page.goto(`/#${r}`)
        await expect(page.locator('main h1').first()).toBeVisible()
        // لا تمرير أفقي في الصفحة نفسها
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, `horizontal overflow on ${r}`).toBeLessThanOrEqual(1)
      }
      expect(errors).toEqual([])
    })
  }
})

test('المحرر يشغّل HTML وCSS وJS في معاينة معزولة مع الطرفية', async ({ page }) => {
  const errors = watchErrors(page)
  await page.goto('/#/editor')
  const ws = page.locator('.ws')
  await ws.getByRole('tab', { name: /index\.html/ }).click()
  await setCode(page, ws, '<h1 id="t">مرحبا</h1><button id="b">زر</button>')
  await ws.getByRole('tab', { name: /style\.css/ }).click()
  await setCode(page, ws, 'h1 { color: rgb(255, 0, 0); }')
  await ws.getByRole('tab', { name: /script\.js/ }).click()
  await setCode(page, ws, 'document.querySelector("#b").addEventListener("click", () => console.log("نُقر", 1 + 1))\nconsole.log("جاهز")')
  await ws.getByRole('button', { name: 'تشغيل' }).click()
  const frame = page.frameLocator('iframe.preview')
  await expect(frame.locator('#t')).toHaveText('مرحبا')
  await expect(frame.locator('#t')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(ws.locator('.c-line').first()).toContainText('جاهز')
  await frame.locator('#b').click()
  await expect(ws.locator('.c-line').filter({ hasText: 'نُقر 2' })).toBeVisible()
  expect(errors).toEqual([])
})

test('العزل: لا وصول لتخزين المنصة أو الصفحة الأم أو الشبكة، والحلقات اللانهائية تتوقف', async ({ page }) => {
  await page.goto('/#/editor')
  await page.evaluate(() => localStorage.setItem('secret-probe', 'x'))
  const ws = page.locator('.ws')
  await ws.getByRole('tab', { name: /script\.js/ }).click()
  await setCode(page, ws, [
    'try { localStorage.getItem("secret-probe"); console.log("LS-OK") } catch (e) { console.log("LS-BLOCKED") }',
    'try { console.log(parent.document.title); console.log("PARENT-OK") } catch (e) { console.log("PARENT-BLOCKED") }',
    'fetch("https://example.com").then(() => console.log("NET-OK")).catch(() => console.log("NET-BLOCKED"))',
    'let i = 0',
    'while (true) { i++ }',
  ].join('\n'))
  await ws.getByRole('button', { name: 'تشغيل' }).click()
  const out = ws.locator('.console')
  await expect(out).toContainText('LS-BLOCKED')
  await expect(out).toContainText('PARENT-BLOCKED')
  await expect(out).toContainText('NET-BLOCKED')
  await expect(out).not.toContainText('LS-OK')
  await expect(out).not.toContainText('NET-OK')
  await expect(out.locator('.err')).toContainText('تجاوز حد الخطوات')
  // الصفحة الأم ما زالت تستجيب
  await page.getByRole('link', { name: 'القاموس' }).first().click()
  await expect(page.locator('main h1')).toContainText('كل مصطلح')
})

test('الحفظ التلقائي يبقى بعد إعادة التحميل، والنسخة الاحتياطية تُصدَّر وتُستورد', async ({ page }) => {
  await page.goto('/#/learn/html-01')
  await page.locator('textarea.notes').fill('ملاحظة اختبار 123')
  await page.waitForTimeout(700)
  await page.reload()
  await expect(page.locator('textarea.notes')).toHaveValue('ملاحظة اختبار 123')

  await page.goto('/#/settings')
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'تصدير نسخة احتياطية' }).click()])
  const path = await download.path()
  const backup = JSON.parse(readFileSync(path, 'utf8'))
  expect(backup.app).toBe('satr')
  expect(backup.lessons['html-01'].note).toBe('ملاحظة اختبار 123')

  await page.getByPlaceholder('اكتب: احذف').fill('احذف')
  await page.getByRole('button', { name: 'حذف كل البيانات' }).click()
  await page.goto('/#/learn/html-01')
  await expect(page.locator('textarea.notes')).toHaveValue('')

  await page.goto('/#/settings')
  await page.locator('input[type=file]').setInputFiles(path)
  await page.getByRole('button', { name: 'استبدال الكل' }).click()
  await page.goto('/#/learn/html-01')
  await expect(page.locator('textarea.notes')).toHaveValue('ملاحظة اختبار 123')
})

test('التمرين يُصحَّح وظيفيًا: الحل القريب الخاطئ يُرفض والحل الصحيح يُقبل', async ({ page }) => {
  await page.goto('/#/learn/css-02')
  const ex = page.locator('#exercise')
  await ex.getByRole('tab', { name: /style\.css/ }).click()
  await setCode(page, ex, '#page p { color: gray; }\n.warning { color: red !important; }')
  await ex.getByRole('button', { name: 'تحقّق من الحل' }).click()
  await expect(ex.locator('.res')).toBeVisible()
  await expect(ex.locator('.r.fail')).toContainText('بدون !important')
  await setCode(page, ex, '#page p { color: gray; }\n#page p.warning { color: red; }')
  await ex.getByRole('button', { name: 'تحقّق من الحل' }).click()
  await expect(ex.locator('.res.ok')).toBeVisible()
})

test('تمرين Vue في درس يجتاز بالحل المرجعي عبر الترجمة الحقيقية', async ({ page }) => {
  await page.goto('/#/learn/vue-04')
  const ex = page.locator('#exercise')
  await ex.getByRole('button', { name: 'تحقّق من الحل' }).click()
  await expect(ex.locator('.res')).toBeVisible()
  await expect(ex.locator('.res.ok')).toHaveCount(0)
  await ex.getByRole('button', { name: 'الحل المرجعي' }).click()
  await ex.getByRole('button', { name: 'ضعه في المحرر' }).click()
  await ex.getByRole('button', { name: 'تحقّق من الحل' }).click()
  await expect(ex.locator('.res.ok')).toBeVisible({ timeout: 30_000 })
})

test('مختبر JS: تتبّع خطوة بخطوة وإيقاف الحلقات اللانهائية', async ({ page }) => {
  await page.goto('/#/js-lab')
  const pane = page.locator('.code-pane')
  await setCode(page, pane, 'let s = 0\nfor (let i = 0; i < 3; i++) {\n  s += i\n}\nconsole.log("s =", s)')
  await page.getByRole('button', { name: 'شغّل وتتبّع' }).click()
  await expect(page.locator('.stepper')).toContainText('الخطوة 1 من')
  await page.getByRole('button', { name: 'النهاية' }).click()
  await expect(page.locator('.logs')).toContainText('s = 3')
  await page.locator('select').filter({ hasText: 'اختر متغيرًا' }).selectOption('s')
  await expect(page.locator('.hist li')).toHaveCount(3) // 0 ثم 1 ثم 3

  await setCode(page, pane, 'let n = 0\nwhile (true) { n++ }')
  await page.getByRole('button', { name: 'شغّل وتتبّع' }).click()
  await expect(page.locator('.side-col .err')).toContainText('تجاوز حد الخطوات')
})

test('محاكي التنفيذ يروي ترتيب حلقة الأحداث ويرسم المراجع', async ({ page }) => {
  await page.goto('/#/visualizer')
  await page.getByRole('button', { name: 'ترتيب حلقة الأحداث' }).click()
  await page.getByRole('button', { name: 'ابدأ الرحلة' }).click()
  await expect(page.locator('.story')).toBeVisible()
  await page.locator('.mk').last().click()
  const lines = await page.locator('.out-lines > div').allInnerTexts()
  expect(lines).toEqual(['1: متزامن', '2: متزامن', '3: وعد', '4: مؤقت'])

  await page.getByRole('button', { name: 'المراجع في الذاكرة' }).click()
  await page.getByRole('button', { name: 'ابدأ الرحلة' }).click()
  await page.locator('.mk').last().click()
  await expect(page.locator('.obj')).toHaveCount(3)
  expect(await page.locator('.wires path').count()).toBeGreaterThanOrEqual(5)
})

test('شرح الأكواد يشرح ما تحت المؤشر ويربط العلاقات', async ({ page }) => {
  await page.goto('/#/explain')
  await page.getByRole('button', { name: 'JavaScript', exact: true }).click()
  const ed = page.locator('.ed')
  await setCode(page, ed, 'const price = 10\nfunction withTax(p) {\n  return p * 1.15\n}\nconsole.log(withTax(price))\nconsole.log(totl)')
  await page.locator('.cm-line').nth(4).click()
  await page.keyboard.press('End')
  await expect(page.locator('.card-x')).toBeVisible()
  await page.getByRole('button', { name: /العلاقات/ }).click()
  await expect(page.locator('.rel').filter({ hasText: 'withTax' })).toContainText('عُرّف: 2')
  await page.getByRole('button', { name: /تنبيهات/ }).click()
  await expect(page.locator('.w-item').filter({ hasText: 'totl' })).toBeVisible()
})

test('الفحص الذاتي: كل الحلول المرجعية تجتاز وكل أكواد البداية تُرفض', async ({ page }) => {
  test.setTimeout(300_000)
  await page.goto('/#/selftest')
  await page.click('[data-test=run-selftest]')
  await page.waitForFunction(() => window.__selftest && window.__selftest.done, null, { timeout: 280_000 })
  const r = await page.evaluate(() => window.__selftest)
  expect(r.total).toBeGreaterThanOrEqual(45)
  expect(r.failed).toEqual([])
})

test('إجابة خاطئة في اختبار الدرس تصبح بطاقة مراجعة مستحقة', async ({ page }) => {
  await page.goto('/#/learn/html-01')
  const quiz = page.locator('#quiz')
  await quiz.locator('.qq').first().getByRole('radio').first().click() // CSS: خاطئة
  await expect(quiz.locator('.explain.no')).toBeVisible()
  await page.goto('/#/review')
  await expect(page.locator('.rcard')).toContainText('أي اللغات الثلاث')
})

test('القاموس: بحث يتجاهل اختلاف الهمزات والتاء المربوطة', async ({ page }) => {
  await page.goto('/#/dictionary')
  await page.getByPlaceholder(/ابحث/).fill('مصفوفه')
  await expect(page.locator('.items a').first()).toContainText('Array')
  await page.getByPlaceholder(/ابحث/).fill('الاغلاق')
  await expect(page.locator('.items a').first()).toContainText('Closure')
})

test('مشروع كامل يحصل على 100 بالحل المرجعي ويُحفظ أفضل نتيجة', async ({ page }) => {
  await page.goto('/#/practice/p-todo-js')
  await page.getByRole('button', { name: 'الحل المرجعي' }).click()
  await page.getByRole('button', { name: 'ضعه في المحرر' }).click()
  await page.getByRole('button', { name: 'تحقّق من الحل' }).click()
  await expect(page.locator('.score')).toHaveText('100/100', { timeout: 30_000 })
  await page.goto('/#/practice')
  await expect(page.locator('.proj').filter({ hasText: 'قائمة مهام' }).locator('.num')).toHaveText('100')
})
