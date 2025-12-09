"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Upload, X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"

type FormData = {
  // Assignment Info
  adjusterName: string
  adjusterEmail: string
  adjusterPhone: string


  insuranceCompany: string
  insuranceAddress: string

  claimNumber: string
  policyNumber: string
  dateOfLoss: string

  // Owner & Inspection
  ownerName: string
  ownerAddress: string
  ownerCity: string
  ownerState: string
  ownerZip: string
  ownerPhoneCell: string
  ownerPhoneHome: string
  ownerPhoneOffice: string
  ownerEmail: string

  inspectionAddress: string
  inspectionCity: string
  inspectionState: string
  inspectionZip: string
  inspectionPhone: string

  // Claim Details
  appraisalType: string
  description: string

  // Vehicle/Equipment Info
  year: string
  make: string
  model: string
  vin: string
  licenseState: string
  plateNumber: string
  damageDescription: string
  factsOfLoss: string
  specialInstructions: string
  mileage: string

  // Files
  files: File[]
}

export function ClaimForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    adjusterName: "",
    adjusterEmail: "",
    adjusterPhone: "",

    insuranceCompany: "",
    insuranceAddress: "",

    claimNumber: "",
    policyNumber: "",
    dateOfLoss: "",

    ownerName: "",
    ownerAddress: "",
    ownerCity: "",
    ownerState: "",
    ownerZip: "",
    ownerPhoneCell: "",
    ownerPhoneHome: "",
    ownerPhoneOffice: "",
    ownerEmail: "",

    inspectionAddress: "",
    inspectionCity: "",
    inspectionState: "",
    inspectionZip: "",
    inspectionPhone: "",

    appraisalType: "",
    description: "",

    year: "",
    make: "",
    model: "",
    vin: "",
    licenseState: "",
    plateNumber: "",
    damageDescription: "",
    factsOfLoss: "",
    specialInstructions: "",
    mileage: "",

    files: [],
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent premature submission if not on the final step
    if (step !== 4) return

    setIsSubmitting(true)

    try {
      const submissionData = new FormData();

      // Add all string fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'files') {
          submissionData.append(key, value as string);
        }
      });

      // Add files
      formData.files.forEach((file) => {
        submissionData.append('files', file);
      });

      const response = await fetch('/api/submit-claim', {
        method: 'POST',
        // Content-Type header not needed, browser sets it automatically with boundary for FormData
        body: submissionData,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        toast.success("Claim submitted successfully!")
      } else {
        toast.error(result.message || "Failed to submit claim. Please try again.")
        console.error('Submission error:', result.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.adjusterName) {
        toast.error("Please enter adjuster name")
        return false
      }
      if (!formData.adjusterEmail) {
        toast.error("Please enter adjuster email")
        return false
      }
      if (!formData.adjusterPhone) {
        toast.error("Please enter adjuster phone")
        return false
      }
      if (!formData.insuranceCompany) {
        toast.error("Please enter insurance company")
        return false
      }
      if (!formData.claimNumber) {
        toast.error("Please enter claim number")
        return false
      }
      if (!formData.dateOfLoss) {
        toast.error("Please enter date of loss")
        return false
      }
    }
    if (currentStep === 2) {
      if (!formData.appraisalType) {
        toast.error("Please select an appraisal type")
        return false
      }
      if (!formData.description) {
        toast.error("Please enter a description")
        return false
      }
      // Location was removed in previous edit, checking if it exists in current state
      // Based on previous file content, location was removed from Step 2 JSX but might still be in state
    }
    if (currentStep === 3) {
      const isEquipment = ["heavy-off-road", "heavy-specialty", "heavy-trailer-tractor", "farm-equipment", "inland-marine", "non-commercial-aircraft", "motor-coach-bus"].includes(formData.appraisalType);
      const isReview = ["appraisal-clause", "audit", "estimate-review-auto", "estimate-review-other", "photos-only", "photos-scope-only", "virtual-estimate", "subrogation-audit", "supplement-assist"].includes(formData.appraisalType);

      if (!isReview) {
        if (!formData.year) {
          toast.error("Please enter year")
          return false
        }
        if (!formData.make) {
          toast.error("Please enter make")
          return false
        }
        if (!formData.model && !["appraisal-clause", "desk"].includes(formData.appraisalType)) {
          // logic matches existing required logic
          toast.error("Please enter model")
          return false
        }
      }
    }
    return true
  }

  const nextStep = (e?: React.MouseEvent) => {
    e?.preventDefault()
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4))
      window.scrollTo(0, 0)
    }
  }
  const prevStep = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Claim Submitted Successfully!</h2>
          <p className="text-lg text-muted-foreground">
            Your claim{" "}
            <span className="font-semibold text-foreground">#{Math.floor(Math.random() * 90000) + 10000}</span> has been
            received.
          </p>
          <p className="text-muted-foreground">
            An Arcadian representative will reach out within 1 business day. A confirmation email has been sent to {formData.adjusterEmail}.
          </p>
          <Button onClick={() => (window.location.href = "/")}>Return to Homepage</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Submit Your Claim</CardTitle>
          <CardDescription>Step {step} of 4 - Please provide the following information</CardDescription>
          {/* Progress Bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Assignment Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Adjuster Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adjusterName">Adjuster Name *</Label>
                    <Input
                      id="adjusterName"
                      required
                      value={formData.adjusterName}
                      onChange={(e) => updateField("adjusterName", e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adjusterEmail">Adjuster Email *</Label>
                    <Input
                      id="adjusterEmail"
                      type="email"
                      required
                      value={formData.adjusterEmail}
                      onChange={(e) => updateField("adjusterEmail", e.target.value)}
                      placeholder="jane@insurance.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adjusterPhone">Adjuster Phone *</Label>
                    <Input
                      id="adjusterPhone"
                      type="tel"
                      required
                      value={formData.adjusterPhone}
                      onChange={(e) => updateField("adjusterPhone", e.target.value)}
                      placeholder="(555) 987-6543"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Insurance Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceCompany">Insurance Company *</Label>
                    <Input
                      id="insuranceCompany"
                      required
                      value={formData.insuranceCompany}
                      onChange={(e) => updateField("insuranceCompany", e.target.value)}
                      placeholder="Insurance Co."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceAddress">Insurance Address</Label>
                    <Input
                      id="insuranceAddress"
                      value={formData.insuranceAddress}
                      onChange={(e) => updateField("insuranceAddress", e.target.value)}
                      placeholder="123 Insurance Way"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Claim Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="claimNumber">Claim Number *</Label>
                    <Input
                      id="claimNumber"
                      required
                      value={formData.claimNumber}
                      onChange={(e) => updateField("claimNumber", e.target.value)}
                      placeholder="CLM-12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) => updateField("policyNumber", e.target.value)}
                      placeholder="POL-67890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfLoss">Date of Loss *</Label>
                    <Input
                      id="dateOfLoss"
                      required
                      type="date"
                      value={formData.dateOfLoss}
                      onChange={(e) => updateField("dateOfLoss", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Owner & Inspection Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Owner Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => updateField("ownerName", e.target.value)}
                      placeholder="Vehicle Owner Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Owner Email</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => updateField("ownerEmail", e.target.value)}
                      placeholder="owner@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerAddress">Address</Label>
                  <Input
                    id="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={(e) => updateField("ownerAddress", e.target.value)}
                    placeholder="Street Address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerCity">City</Label>
                    <Input
                      id="ownerCity"
                      value={formData.ownerCity}
                      onChange={(e) => updateField("ownerCity", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerState">State</Label>
                    <Input
                      id="ownerState"
                      value={formData.ownerState}
                      onChange={(e) => updateField("ownerState", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerZip">Zip Code</Label>
                    <Input
                      id="ownerZip"
                      value={formData.ownerZip}
                      onChange={(e) => updateField("ownerZip", e.target.value)}
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhoneCell">Cell Phone</Label>
                    <Input
                      id="ownerPhoneCell"
                      type="tel"
                      value={formData.ownerPhoneCell}
                      onChange={(e) => updateField("ownerPhoneCell", e.target.value)}
                      placeholder="Cell"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhoneHome">Home Phone</Label>
                    <Input
                      id="ownerPhoneHome"
                      type="tel"
                      value={formData.ownerPhoneHome}
                      onChange={(e) => updateField("ownerPhoneHome", e.target.value)}
                      placeholder="Home"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhoneOffice">Office Phone</Label>
                    <Input
                      id="ownerPhoneOffice"
                      type="tel"
                      value={formData.ownerPhoneOffice}
                      onChange={(e) => updateField("ownerPhoneOffice", e.target.value)}
                      placeholder="Office"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Inspection Location</h3>
                <div className="space-y-2">
                  <Label htmlFor="inspectionAddress">Address</Label>
                  <Input
                    id="inspectionAddress"
                    value={formData.inspectionAddress}
                    onChange={(e) => updateField("inspectionAddress", e.target.value)}
                    placeholder="Inspection Street Address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inspectionCity">City</Label>
                    <Input
                      id="inspectionCity"
                      value={formData.inspectionCity}
                      onChange={(e) => updateField("inspectionCity", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspectionState">State</Label>
                    <Input
                      id="inspectionState"
                      value={formData.inspectionState}
                      onChange={(e) => updateField("inspectionState", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspectionZip">Zip Code</Label>
                    <Input
                      id="inspectionZip"
                      value={formData.inspectionZip}
                      onChange={(e) => updateField("inspectionZip", e.target.value)}
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectionPhone">Contact Phone</Label>
                  <Input
                    id="inspectionPhone"
                    type="tel"
                    value={formData.inspectionPhone}
                    onChange={(e) => updateField("inspectionPhone", e.target.value)}
                    placeholder="Contact Person Phone"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Claim Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="appraisalType">Appraisal Type *</Label>
                  <select
                    id="appraisalType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.appraisalType}
                    onChange={(e) => updateField("appraisalType", e.target.value)}
                  >
                    <option value="">Select Appraisal Type</option>
                    <optgroup label="Auto & Light Truck">
                      <option value="auto">Auto Appraisal</option>
                      <option value="classic">Classic Vehicle</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="light-truck">Light Truck</option>
                    </optgroup>
                    <optgroup label="Heavy Equipment">
                      <option value="heavy-off-road">Heavy Equipment (Off Road)</option>
                      <option value="heavy-specialty">Heavy Equipment (Specialty)</option>
                      <option value="heavy-trailer-tractor">Heavy Equipment (Trailer/Tractor)</option>
                      <option value="farm-equipment">Farm Equipment</option>
                      <option value="inland-marine">Inland Marine</option>
                      <option value="non-commercial-aircraft">Non-Commercial Aircraft</option>
                      <option value="motor-coach-bus">Motor Coach/Bus</option>
                    </optgroup>
                    <optgroup label="Desk & Review Services">
                      <option value="audit">Audit</option>
                      <option value="desk">Desk Appraisal</option>
                      <option value="appraisal-clause">Appraisal Clause</option>
                      <option value="estimate-review-auto">Estimate Review (Auto)</option>
                      <option value="estimate-review-other">Estimate Review (Other)</option>
                      <option value="photos-only">Photos Only</option>
                      <option value="photos-scope-only">Photos & Scope Only</option>
                      <option value="virtual-estimate">Virtual Estimate</option>
                      <option value="subrogation-audit">Subrogation Audit</option>
                      <option value="supplement-assist">Supplement Assist</option>
                    </optgroup>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description of Assignment *</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Please provide details about the assignment..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle/Equipment Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                {["heavy-off-road", "heavy-specialty", "heavy-trailer-tractor", "farm-equipment", "inland-marine", "non-commercial-aircraft", "motor-coach-bus"].includes(formData.appraisalType)
                  ? "Equipment Information"
                  : "Vehicle Information"}
              </h3>
              {["appraisal-clause", "audit", "estimate-review-auto", "estimate-review-other", "photos-only", "photos-scope-only", "virtual-estimate", "subrogation-audit", "supplement-assist"].includes(formData.appraisalType) ? (
                <p className="text-muted-foreground">
                  Vehicle/equipment details can be provided in the description or uploaded documents. Click "Next" to
                  continue.
                </p>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        required={!["appraisal-clause", "audit", "estimate-review-auto", "estimate-review-other", "photos-only", "photos-scope-only", "virtual-estimate", "subrogation-audit", "supplement-assist"].includes(formData.appraisalType)}
                        value={formData.year}
                        onChange={(e) => updateField("year", e.target.value)}
                        placeholder="2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        required={!["appraisal-clause", "audit", "estimate-review-auto", "estimate-review-other", "photos-only", "photos-scope-only", "virtual-estimate", "subrogation-audit", "supplement-assist"].includes(formData.appraisalType)}
                        value={formData.make}
                        onChange={(e) => updateField("make", e.target.value)}
                        placeholder="Toyota"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        required={!["appraisal-clause", "desk"].includes(formData.appraisalType)}
                        value={formData.model}
                        onChange={(e) => updateField("model", e.target.value)}
                        placeholder="Camry"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vin">VIN/Serial Number</Label>
                      <Input
                        id="vin"
                        value={formData.vin}
                        onChange={(e) => updateField("vin", e.target.value)}
                        placeholder="1HGBH41JXMN109186"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseState">License State</Label>
                      <Input
                        id="licenseState"
                        value={formData.licenseState}
                        onChange={(e) => updateField("licenseState", e.target.value)}
                        placeholder="GA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plateNumber">Plate Number</Label>
                      <Input
                        id="plateNumber"
                        value={formData.plateNumber}
                        onChange={(e) => updateField("plateNumber", e.target.value)}
                        placeholder="ABC-1234"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="damageDescription">Damage Description</Label>
                    <Textarea
                      id="damageDescription"
                      value={formData.damageDescription}
                      onChange={(e) => updateField("damageDescription", e.target.value)}
                      placeholder="Describe the damage..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="factsOfLoss">Facts of Loss (FOL)</Label>
                    <Textarea
                      id="factsOfLoss"
                      value={formData.factsOfLoss}
                      onChange={(e) => updateField("factsOfLoss", e.target.value)}
                      placeholder="Describe how the loss occurred..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => updateField("specialInstructions", e.target.value)}
                      placeholder="Instructions for the adjuster..."
                      rows={3}
                    />
                  </div>

                  {!["heavy-off-road", "heavy-specialty", "heavy-trailer-tractor", "farm-equipment", "inland-marine", "non-commercial-aircraft", "motor-coach-bus"].includes(formData.appraisalType) && (
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage (Optional)</Label>
                      <Input
                        id="mileage"
                        value={formData.mileage}
                        onChange={(e) => updateField("mileage", e.target.value)}
                        placeholder="45000"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 4: Upload Files */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Upload Supporting Files</h3>
              <p className="text-muted-foreground">
                Upload photos of damage, existing estimates, or other relevant documents. Accepted formats: JPEG, PNG,
                PDF. Max 20MB per file.
              </p>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:text-primary/80 font-medium">
                  Click to upload files
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground mt-2">or drag and drop files here</p>
              </div>
              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Uploaded Files:</h4>
                  <ul className="space-y-2">
                    {formData.files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Claim
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
