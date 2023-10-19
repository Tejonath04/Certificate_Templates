

const PDFDocument = require('pdfkit');

function generatePDF(data,images) {
  const doc = new PDFDocument({ autoFirstPage: false });

  doc.addPage({
    size: 'A4',
    layout: 'landscape',
  });

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Center the background image
  doc.image(images.BGimg[0], 0, 0, { width: pageWidth, height: pageHeight });
  doc.fontSize(35)
    .fillColor('#630a04')
    .text(data.Header,80,200, {
      align: 'center',
    });
    //doc.moveDown(1);

    doc.font('Times-Roman')
    .fontSize(30)
    .fillColor('#630a04')
    .text(data.subHeader,80,240,{
      align: 'center',
    });
    
  doc.font('Times-Roman')
  .fontSize(15)
  .fillColor('black')
  .text(data.textt, 80,290, {
  });


doc.image(images.Simg1[0], parseInt(data.s1x), parseInt(data.s1y), { fit: [100, 100] });
doc.image(images.Simg2[0], parseInt(data.s2x), parseInt(data.s2y), { fit: [100, 100] });
doc.image(images.Simg3[0], parseInt(data.s3x), parseInt(data.s3y), { fit: [100, 100] });
doc.image("images/1245.png", parseInt(data.Qx), parseInt(data.Qy), { fit: [80, 80] });
doc.image(images.Limg1[0], parseInt(data.L1x), parseInt(data.L1y), { fit: [90, 90] });
doc.image(images.Limg2[0], parseInt(data.L2x), parseInt(data.L2y), { fit: [90, 90] });
doc.image(images.Limg3[0], parseInt(data.L3x), parseInt(data.L3y), { fit: [90, 90] });


  return doc;
}

module.exports = generatePDF;
