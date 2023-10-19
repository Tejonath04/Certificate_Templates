const PDFDocument = require('pdfkit');

function generatePDFL(data) {
  const doc = new PDFDocument({ autoFirstPage: false });

  doc.addPage({
    size: 'A4',
    layout: 'Landscape',
  });

  const pageWidth = doc.page.width;
  console.log(pageWidth);
  const pageHeight = doc.page.height;
  console.log(pageHeight);

  // Center the background image
  doc.image(data.BGimg, 0, 0, { width: pageWidth, height: pageHeight });

  doc.fontSize(35)
    .fillColor('#630a04')
    .text(data.header.content,data.header.x,data.header.y, {
      align: 'center',
    });
    //doc.moveDown(1);

    doc.font('Times-Roman')
    .fontSize(30)
    .fillColor('#630a04')
    .text(data.subheader.content,data.subheader.x,data.subheader.y,{
      align: 'center',
    });

  doc.font('Times-Roman')
  .fontSize(15)
  .fillColor('black')
  .text(data.text.content, data.text.x,data.text.y, {
  });


  for (let i = 0; i < data.images.length; i++) {
    const imageName = data.images[i].imageName;
    const x = data.images[i].x;
    const y = data.images[i].y;

    doc.image(imageName, x,y, { fit: [100, 100] });

    //console.log(`imageName: ${imageName}, x: ${x}, y: ${y}`);
  }

  return doc;
}

function generatePDFP(data) {
    const doc = new PDFDocument({ autoFirstPage: false });
  
    doc.addPage({
      size: 'A4',
      layout: 'portrait',
    });
  
    const pageWidth = doc.page.width;
    console.log(pageWidth);
    const pageHeight = doc.page.height;
    console.log(pageHeight);
  
    // Center the background image
    doc.image(data.BGimg, 0, 0, { width: pageWidth, height: pageHeight });
  
    doc.fontSize(35)
      .fillColor('#630a04')
      .text(data.header.content,data.header.x,data.header.y, {
        align: 'center',
      });
      //doc.moveDown(1);
  
      doc.font('Times-Roman')
      .fontSize(30)
      .fillColor('#630a04')
      .text(data.subheader.content,data.subheader.x,data.subheader.y,{
        align: 'center',
      });
  
    doc.font('Times-Roman')
    .fontSize(15)
    .fillColor('black')
    .text(data.text.content, data.text.x,data.text.y, {
    });
  
  
    for (let i = 0; i < data.images.length; i++) {
      const imageName = data.images[i].imageName;
      const x = data.images[i].x;
      const y = data.images[i].y;
  
      doc.image(imageName, x,y, { fit: [100, 100] });
  
      //console.log(`imageName: ${imageName}, x: ${x}, y: ${y}`);
    }
  
    return doc;
  }

module.exports = { generatePDFL, generatePDFP};
