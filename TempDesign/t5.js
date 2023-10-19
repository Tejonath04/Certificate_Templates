const multer = require('multer');
const PDFDocument = require('pdfkit');

const uploadFieldsConfig = [
  { name: 'BGimg', maxCount: 1 },
  { name: 'Qimg', maxCount: 1 },
  { name: 'Simg1', maxCount: 1 },
  { name: 'Simg2', maxCount: 1 },
  { name: 'Limg1', maxCount: 1 },
  { name: 'Limg2', maxCount: 1 }
];

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function generatePDF(data, images) {
    const doc = new PDFDocument({ autoFirstPage: false });

    doc.addPage({
      size: 'A4',
      layout: 'portrait',
    });
  
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
  
    // Center the background image
    doc.image(images.BGimg[0].buffer, 0, 0,{ width: pageWidth, height: pageHeight });
  
    doc.fontSize(35)
      .fillColor('#630a04')
      .text(data.Header,80,210, {
        align: 'center',
      });
      //doc.moveDown(1);
  
      doc.font('Times-Roman')
      .fontSize(30)
      .fillColor('#630a04')
      .text(data.subHeader,80,260,{
        align: 'center',
      });
  
    doc.font('Times-Roman')
    .fontSize(15)
    .fillColor('black')
    .text(data.textt, 80,400, {
    });


    doc.image(images.Simg1[0].buffer, parseInt(data.s1x), parseInt(data.s1y), { fit: [100, 100] });
    doc.image(images.Simg2[0].buffer, parseInt(data.s2x), parseInt(data.s2y), { fit: [100, 100] });
    doc.image("images/1245.png", parseInt(data.Qx), parseInt(data.Qy), { fit: [80, 80] });
    doc.image(images.Limg1[0].buffer, parseInt(data.L1x), parseInt(data.L1y), { fit: [90, 90] });
    doc.image(images.Limg2[0].buffer, parseInt(data.L2x), parseInt(data.L2y), { fit: [90, 90] });

    return doc;
}

module.exports = { generatePDF, upload, uploadFieldsConfig };
