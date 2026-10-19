/**
 * @OnlyCurrentDoc
 *
 * Recebe os leads do formulário de /demo e grava na primeira aba desta planilha.
 * Instalação: Extensões → Apps Script → colar este arquivo → Implantar →
 * Nova implantação → "App da Web", Executar como: Eu, Quem pode acessar: Qualquer pessoa.
 * A URL /exec gerada vai em LEAD_ENDPOINT no demo/index.html.
 *
 * Segurança: só existe doPost (nada de doGet), então a URL não expõe os dados.
 * @OnlyCurrentDoc limita o script a esta planilha.
 */

const HEADERS = ['id', 'data', 'nome', 'empresa', 'celular', 'origem', 'demo', 'navegador'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return ok_(); // honeypot: só robôs preenchem

    lock.waitLock(10000);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const id = clean_(d.id, 40);
    if (!/^[a-z0-9-]{8,40}$/i.test(id)) return ok_();
    const row = findRow_(sheet, id);

    // Segunda chamada: registra qual demo o lead abriu.
    if (d.type === 'choice') {
      const demo = clean_(d.demo, 20);
      if (row && /^(alarme|portaria)$/.test(demo)) {
        const cell = sheet.getRange(row, 7);
        const prev = String(cell.getValue());
        if (prev.split(', ').indexOf(demo) === -1) cell.setValue(prev ? prev + ', ' + demo : demo);
      }
      return ok_();
    }

    if (row) return ok_(); // reenvio do mesmo lead (fila offline)

    const name = clean_(d.name, 100);
    const company = clean_(d.company, 100);
    const phone = String(d.phone || '').replace(/\D/g, '');
    if (name.split(/\s+/).length < 2 || !company || phone.length !== 11) return ok_();

    sheet.appendRow([
      id,
      new Date(),
      name,
      company,
      '(' + phone.slice(0, 2) + ') ' + phone.slice(2, 7) + '-' + phone.slice(7),
      clean_(d.source, 40),
      '',
      clean_(d.ua, 200),
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    lock.releaseLock();
  }
  return ok_();
}

// Limita o tamanho e impede que o texto vire fórmula (=, +, -, @) na planilha.
function clean_(v, max) {
  const s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function findRow_(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const hit = sheet.getRange(2, 1, last - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
  return hit ? hit.getRow() : 0;
}

function ok_() {
  return ContentService.createTextOutput('ok');
}
