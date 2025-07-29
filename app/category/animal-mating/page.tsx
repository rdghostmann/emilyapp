"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  Upload,
  X,
  Heart,
  Shield,
  CalendarIcon,
  Camera,
  Video,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react"

interface AnimalMatingFormData {
  // Basic Info
  animalType: string
  breed: string
  gender: string
  age: string
  dateOfBirth: Date | undefined

  // Pedigree & Genetics
  pedigreeStatus: string
  registeredName: string
  specialTraits: string[]

  // Reproductive Info
  matingPurpose: string[]
  breedingHistory: string
  fertilityTested: string

  // Health & Vet Info
  vaccinationStatus: string
  dewormed: string
  geneticTested: string

  // Availability & Fee
  availableFrom: Date | undefined
  availableUntil: Date | undefined
  breedingFee: string
  freeForStudy: boolean

  // Location & Contact
  state: string
  lga: string
  exactLocation: string
  contactMethods: string[]
  phoneNumber: string
  whatsappNumber: string
  email: string

  // Additional Notes
  additionalNotes: string
}

const animalTypes = ["Dog", "Cat", "Goat", "Cow", "Sheep", "Horse", "Pig", "Rabbit", "Poultry", "Others"]

const dogBreeds = [
  "German Shepherd",
  "Rottweiler",
  "Labrador",
  "Golden Retriever",
  "Bulldog",
  "Poodle",
  "Husky",
  "Others",
]

const goatBreeds = ["Boer", "Sokoto Red", "West African Dwarf", "Saanen", "Nubian", "Others"]

const cattleBreeds = ["Holstein", "Friesian", "Brahman", "Angus", "Zebu", "N'Dama", "Others"]

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

const specialTraitOptions = [
  "Blue eyes",
  "Fast grower",
  "Hornless",
  "Docile temperament",
  "Muscular build",
  "Rare coat color",
  "High milk production",
  "Disease resistant",
  "Good mothering ability",
  "Strong jawline",
]

export default function AnimalMatingPage() {
  const [formData, setFormData] = useState<AnimalMatingFormData>({
    animalType: "",
    breed: "",
    gender: "",
    age: "",
    dateOfBirth: undefined,
    pedigreeStatus: "",
    registeredName: "",
    specialTraits: [],
    matingPurpose: [],
    breedingHistory: "",
    fertilityTested: "",
    vaccinationStatus: "",
    dewormed: "",
    geneticTested: "",
    availableFrom: undefined,
    availableUntil: undefined,
    breedingFee: "",
    freeForStudy: false,
    state: "",
    lga: "",
    exactLocation: "",
    contactMethods: [],
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    additionalNotes: "",
  })

  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const getBreedOptions = () => {
    switch (formData.animalType.toLowerCase()) {
      case "dog":
        return dogBreeds
      case "goat":
        return goatBreeds
      case "cow":
        return cattleBreeds
      default:
        return ["Others"]
    }
  }

  const handleInputChange = (field: keyof AnimalMatingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: keyof AnimalMatingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter((item) => item !== value)
        : [...(prev[field] as string[]), value],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 3 images.",
        variant: "destructive",
      })
      return
    }

    setImages((prev) => [...prev, ...files])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (videos.length + files.length > 1) {
      toast({
        title: "Video limit exceeded",
        description: "You can upload maximum 1 video (max 30 seconds).",
        variant: "destructive",
      })
      return
    }
    setVideos((prev) => [...prev, ...files])
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setDocuments((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Animal Posted Successfully!",
        description: "Your animal is now available for mating/study requests.",
      })

      // Reset form
      setFormData({
        animalType: "",
        breed: "",
        gender: "",
        age: "",
        dateOfBirth: undefined,
        pedigreeStatus: "",
        registeredName: "",
        specialTraits: [],
        matingPurpose: [],
        breedingHistory: "",
        fertilityTested: "",
        vaccinationStatus: "",
        dewormed: "",
        geneticTested: "",
        availableFrom: undefined,
        availableUntil: undefined,
        breedingFee: "",
        freeForStudy: false,
        state: "",
        lga: "",
        exactLocation: "",
        contactMethods: [],
        phoneNumber: "",
        whatsappNumber: "",
        email: "",
        additionalNotes: "",
      })
      setImages([])
      setVideos([])
      setDocuments([])
      setImagePreviews([])
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Animal for Mating & Study</h1>
            <p className="text-gray-600">
              Connect with other breeders and researchers. Share your animal for mating, artificial insemination, or
              genetic studies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="animalType">Animal Type *</Label>
                    <Select
                      value={formData.animalType}
                      onValueChange={(value) => handleInputChange("animalType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {animalTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="breed">Breed *</Label>
                    <Select
                      value={formData.breed}
                      onValueChange={(value) => handleInputChange("breed", value)}
                      disabled={!formData.animalType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {getBreedOptions().map((breed) => (
                          <SelectItem key={breed} value={breed}>
                            {breed}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="age">Age (in months) *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="24"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Date of Birth (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth}
                          onSelect={(date) => handleInputChange("dateOfBirth", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Pedigree & Genetics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  Pedigree & Genetics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pedigreeStatus">Pedigree Status *</Label>
                    <Select
                      value={formData.pedigreeStatus}
                      onValueChange={(value) => handleInputChange("pedigreeStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pedigree status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purebred">Purebred</SelectItem>
                        <SelectItem value="crossbreed">Crossbreed</SelectItem>
                        <SelectItem value="registered">Registered Pedigree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="registeredName">Registered Name/ID (Optional)</Label>
                    <Input
                      id="registeredName"
                      placeholder="Champion Bloodline Rex"
                      value={formData.registeredName}
                      onChange={(e) => handleInputChange("registeredName", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Special Traits (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {specialTraitOptions.map((trait) => (
                      <div key={trait} className="flex items-center space-x-2">
                        <Checkbox
                          id={trait}
                          checked={formData.specialTraits.includes(trait)}
                          onCheckedChange={() => handleArrayToggle("specialTraits", trait)}
                        />
                        <Label htmlFor={trait} className="text-sm">
                          {trait}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.specialTraits.map((trait) => (
                      <Badge key={trait} variant="secondary" className="bg-blue-100 text-blue-800">
                        {trait}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => handleArrayToggle("specialTraits", trait)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Upload Certificate (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <Label htmlFor="certificate-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        Upload Certificate
                      </Button>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Reproductive Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-500" />
                  Reproductive Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Mating Purpose (Select all that apply) *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Natural Mating", "Artificial Insemination", "Genetic Study/Research", "Semen/Egg Donation"].map(
                      (purpose) => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <Checkbox
                            id={purpose}
                            checked={formData.matingPurpose.includes(purpose)}
                            onCheckedChange={() => handleArrayToggle("matingPurpose", purpose)}
                          />
                          <Label htmlFor={purpose} className="text-sm">
                            {purpose}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <Label>Breeding History *</Label>
                  <RadioGroup
                    value={formData.breedingHistory}
                    onValueChange={(value) => handleInputChange("breedingHistory", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="proven" id="proven" />
                      <Label htmlFor="proven">Proven Breeder (has produced offspring before)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="first-time" id="first-time" />
                      <Label htmlFor="first-time">First-time mating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-applicable" id="not-applicable" />
                      <Label htmlFor="not-applicable">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Fertility Tested?</Label>
                  <RadioGroup
                    value={formData.fertilityTested}
                    onValueChange={(value) => handleInputChange("fertilityTested", value)}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="fertility-yes" />
                      <Label htmlFor="fertility-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fertility-no" />
                      <Label htmlFor="fertility-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Health & Vet Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Health & Veterinary Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Vaccination Status</Label>
                    <RadioGroup
                      value={formData.vaccinationStatus}
                      onValueChange={(value) => handleInputChange("vaccinationStatus", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vaccinated" id="vaccinated" />
                        <Label htmlFor="vaccinated">Vaccinated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-vaccinated" id="not-vaccinated" />
                        <Label htmlFor="not-vaccinated">Not Vaccinated</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Dewormed?</Label>
                    <RadioGroup
                      value={formData.dewormed}
                      onValueChange={(value) => handleInputChange("dewormed", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="dewormed-yes" />
                        <Label htmlFor="dewormed-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="dewormed-no" />
                        <Label htmlFor="dewormed-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Genetically Tested?</Label>
                    <RadioGroup
                      value={formData.geneticTested}
                      onValueChange={(value) => handleInputChange("geneticTested", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="genetic-yes" />
                        <Label htmlFor="genetic-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="genetic-no" />
                        <Label htmlFor="genetic-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label>Upload Vet Report (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="vet-report-upload"
                    />
                    <Label htmlFor="vet-report-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        Upload Vet Report
                      </Button>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-purple-500" />
                  Media Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Animal Photos (Mandatory - Max 3 images) *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={images.length >= 3}
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" disabled={images.length >= 3}>
                        Upload Photos ({images.length}/3)
                      </Button>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Clear front & side views required</p>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Animal ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Short Video (Optional - Max 30 seconds)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                      disabled={videos.length >= 1}
                    />
                    <Label htmlFor="video-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" disabled={videos.length >= 1}>
                        Upload Video ({videos.length}/1)
                      </Button>
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Show movement, behavior, etc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Availability & Fee */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-500" />
                  Availability & Fee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Available From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.availableFrom ? format(formData.availableFrom, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.availableFrom}
                          onSelect={(date) => handleInputChange("availableFrom", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Available Until</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.availableUntil ? format(formData.availableUntil, "PPP") : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.availableUntil}
                          onSelect={(date) => handleInputChange("availableUntil", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breedingFee">Breeding Fee (₦)</Label>
                    <Input
                      id="breedingFee"
                      type="number"
                      placeholder="20000"
                      value={formData.breedingFee}
                      onChange={(e) => handleInputChange("breedingFee", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="freeForStudy"
                      checked={formData.freeForStudy}
                      onCheckedChange={(checked) => handleInputChange("freeForStudy", checked)}
                    />
                    <Label htmlFor="freeForStudy">Free for Scientific Study Only</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Location & Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  Location & Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="lga">LGA/Area *</Label>
                    <Input
                      id="lga"
                      placeholder="Enter LGA or Area"
                      value={formData.lga}
                      onChange={(e) => handleInputChange("lga", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exactLocation">Exact Location (Optional)</Label>
                  <Input
                    id="exactLocation"
                    placeholder="Street, compound, landmark"
                    value={formData.exactLocation}
                    onChange={(e) => handleInputChange("exactLocation", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Preferred Contact Methods *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["Phone", "WhatsApp", "Email"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={formData.contactMethods.includes(method)}
                          onCheckedChange={() => handleArrayToggle("contactMethods", method)}
                        />
                        <Label htmlFor={method} className="text-sm">
                          {method}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+234 800 123 4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input
                      id="whatsappNumber"
                      type="tel"
                      placeholder="+234 800 123 4567"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 8: Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="additionalNotes">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="e.g., 'Only available weekends', 'Female must be vaccinated before mating', 'Mating only within Jos area'"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Preview Listing
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Listing
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
