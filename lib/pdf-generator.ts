import { jsPDF } from "jspdf";

export async function generateClaimPDF(formData: any): Promise<Buffer> {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text('Arcadian Claims Services', 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Claim Submission Form', 105, 30, { align: 'center' });

  let yPos = 50;

  // Assignment Information
  doc.setFontSize(16);
  doc.text('Assignment Information', 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 15;

  doc.setFontSize(12);

  yPos += 5;
  if (formData.adjusterName) {
    doc.text(`Adjuster: ${formData.adjusterName} (${formData.adjusterEmail || ''})`, 20, yPos);
    yPos += 10;
  }
  if (formData.insuranceCompany) {
    doc.text(`Insurance Co: ${formData.insuranceCompany}`, 20, yPos);
    yPos += 10;
  }

  doc.text(`Claim Number: ${formData.claimNumber || 'N/A'}`, 20, yPos);
  yPos += 10;
  if (formData.policyNumber) {
    doc.text(`Policy Number: ${formData.policyNumber}`, 20, yPos);
    yPos += 10;
  }
  if (formData.dateOfLoss) {
    doc.text(`Date of Loss: ${formData.dateOfLoss}`, 20, yPos);
    yPos += 10;
  }

  yPos += 10;

  // Owner & Inspection
  doc.setFontSize(16);
  doc.text('Owner & Inspection Details', 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 15;

  doc.setFontSize(12);
  doc.text(`Owner Name: ${formData.ownerName || 'N/A'}`, 20, yPos);
  yPos += 10;
  doc.text(`Owner Phone: ${formData.ownerPhoneCell || formData.ownerPhoneHome || formData.ownerPhoneOffice || 'N/A'}`, 20, yPos);
  yPos += 10;
  doc.text(`Owner Email: ${formData.ownerEmail || 'N/A'}`, 20, yPos);
  yPos += 10;

  if (formData.inspectionAddress) {
    doc.text(`Inspection Location: ${formData.inspectionAddress}, ${formData.inspectionCity || ''}`, 20, yPos);
    yPos += 10;
  }

  yPos += 10;

  // Vehicle/Equipment Information
  doc.setFontSize(16);
  doc.text('Vehicle/Equipment Information', 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 15;

  doc.setFontSize(12);
  if (formData.year || formData.make || formData.model) {
    doc.text(`Vehicle: ${formData.year || ''} ${formData.make || ''} ${formData.model || ''}`, 20, yPos);
    yPos += 10;
  }
  if (formData.vin) {
    doc.text(`VIN: ${formData.vin}`, 20, yPos);
    yPos += 10;
  }
  if (formData.licenseState || formData.plateNumber) {
    doc.text(`Plate: ${formData.plateNumber || ''} (${formData.licenseState || ''})`, 20, yPos);
    yPos += 10;
  }

  yPos += 10;
  doc.text(`Appraisal Type: ${formData.appraisalType || 'N/A'}`, 20, yPos);
  yPos += 10;

  // Description - handle multi-line
  const descLines = doc.splitTextToSize(`Description: ${formData.description || 'N/A'}`, 170);
  doc.text(descLines, 20, yPos);
  yPos += (descLines.length * 7) + 5;

  if (formData.damageDescription) {
    const damageLines = doc.splitTextToSize(`Damage: ${formData.damageDescription}`, 170);
    doc.text(damageLines, 20, yPos);
    yPos += (damageLines.length * 7) + 5;
  }

  if (formData.factsOfLoss) {
    const folLines = doc.splitTextToSize(`Facts of Loss: ${formData.factsOfLoss}`, 170);
    doc.text(folLines, 20, yPos);
    yPos += (folLines.length * 7) + 5;
  }

  if (formData.specialInstructions) {
    const instrLines = doc.splitTextToSize(`Instructions: ${formData.specialInstructions}`, 170);
    doc.text(instrLines, 20, yPos);
    yPos += (instrLines.length * 7) + 5;
  }

  // Files
  if (formData.files && formData.files.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 10;
    doc.setFontSize(16);
    doc.text('Attached Files', 20, yPos);
    doc.line(20, yPos + 2, 190, yPos + 2);
    yPos += 15;

    doc.setFontSize(12);
    formData.files.forEach((file: any, index: number) => {
      doc.text(`${index + 1}. ${file.name || file}`, 20, yPos);
      yPos += 10;
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Submitted on: ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`,
      105,
      285,
      { align: 'center' }
    );
  }

  // Return Buffer
  return Buffer.from(doc.output('arraybuffer'));
}

export async function generateContactPDF(formData: any): Promise<Buffer> {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text('Arcadian Claims Services', 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Contact Form Submission', 105, 30, { align: 'center' });

  let yPos = 50;

  // Contact Information
  doc.setFontSize(16);
  doc.text('Contact Information', 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 15;

  doc.setFontSize(12);
  doc.text(`Name: ${formData.name || 'N/A'}`, 20, yPos);
  yPos += 10;
  doc.text(`Email: ${formData.email || 'N/A'}`, 20, yPos);
  yPos += 10;
  if (formData.phone) {
    doc.text(`Phone: ${formData.phone}`, 20, yPos);
    yPos += 10;
  }

  yPos += 10;

  // Message
  if (formData.message) {
    doc.setFontSize(16);
    doc.text('Message', 20, yPos);
    doc.line(20, yPos + 2, 190, yPos + 2);
    yPos += 15;

    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(formData.message, 170);
    doc.text(splitText, 20, yPos);
  }

  // Footer
  doc.setFontSize(10);
  doc.text(
    `Submitted on: ${new Date().toLocaleString()}`,
    105,
    285,
    { align: 'center' }
  );

  return Buffer.from(doc.output('arraybuffer'));
}
