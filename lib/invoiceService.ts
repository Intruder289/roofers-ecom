import puppeteer from 'puppeteer';

export async function generateInvoicePDF(data: any) {
  const html = generateInvoiceHTML(data);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}

function generateInvoiceHTML(data: any) {
  const total = data.items.reduce((sum: number, i: any) => sum + i.qty * i.price, 0);
  const date = new Date().toLocaleDateString();

  return `
  <html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        color: #333;
        padding: 40px;
        background: #f7f9fc;
      }

      .invoice-box {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        height: 60px;
      }

      h1 {
        text-align: center;
        color: #444;
        margin-bottom: 20px;
      }

      .invoice-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
      }

      .section-title {
        color: #555;
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 14px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }

      th {
        background-color: #f1f1f1;
      }

      .total {
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        margin-top: 20px;
      }

      .payment-info {
        margin-top: 40px;
        padding: 15px;
        background-color: #eef6ff;
        border-left: 4px solid #007bff;
        border-radius: 6px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        margin-top: 50px;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <div class="header">
        <img src="http://localhost:3000/logo.jpg" class="logo" alt="Company Logo"/>
        <div style="text-align:right;">
          <h2>Invoice</h2>
          <p><b>ID:</b> ${data.id}</p>
          <p><b>Date:</b> ${date}</p>
        </div>
      </div>

      <div class="invoice-info">
        <div>
          <div class="section-title">From:</div>
          <p><b>Roofers Group Limited</b><br>
          Dar es salaam<br>
          roofersgroup@outlook.com<br>
          +255 700 000 000</p>
        </div>

        <div>
          <div class="section-title">Bill To:</div>
          <p>${data.customer.name}<br>
          ${data.customer.email}<br>
          ${data.customer.address}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map((item: any) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.qty}</td>
              <td>Tzs ${item.price.toFixed(2)}</td>
              <td>Tzs ${(item.qty * item.price).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total">
        Total: Tzs ${total.toFixed(2)}
      </div>

      <div class="payment-info">
        <div class="section-title">Payment Information:</div>
        <p>
          Bank: CRDB Bank PLC<br>
          Account Name: Roofers Group Ltd<br>
          Account Number: 1234567890<br>
          SWIFT Code: CRDBTZTZ<br>
          Reference: ${data.id}
        </p>
        <p><i>Please complete payment within 7 days.</i></p>
      </div>

      ${data.notes ? `<p style="margin-top:20px;">${data.notes}</p>` : ''}

      <div class="footer">
        Thank you for your business.<br/>
        Generated automatically by invoicing software.
      </div>
    </div>
  </body>
  </html>
  `;
}
