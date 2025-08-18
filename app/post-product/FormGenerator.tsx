"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface FormGeneratorProps {
  category: string
  subcategory: string
  onChange: (details: Record<string, any>) => void
}

export default function FormGenerator({ category, subcategory, onChange }: FormGeneratorProps) {
  const [details, setDetails] = useState<Record<string, any>>({})

  const handleChange = (field: string, value: any) => {
    const updated = { ...details, [field]: value }
    setDetails(updated)
    onChange(updated)
  }

  if (!subcategory) return null

  // Normalize for easier matching
  const normalized = subcategory.toLowerCase()

  switch (normalized) {
    /** 🐐 Animal Mating **/
    case "dog":
    case "goat":
    case "pig":
    case "ai service":
    case "natural mating":
      return (
        <div className="space-y-4">
          <div>
            <Label>Species</Label>
            <Input onChange={(e) => handleChange("species", e.target.value)} />
          </div>
          <div>
            <Label>Breed</Label>
            <Input onChange={(e) => handleChange("breed", e.target.value)} />
          </div>
          <div>
            <Label>Age (months)</Label>
            <Input type="number" onChange={(e) => handleChange("age", e.target.value)} />
          </div>
          <div>
            <Label>Health Status</Label>
            <Textarea onChange={(e) => handleChange("healthStatus", e.target.value)} />
          </div>
        </div>
      )

    /** 💊 Animal Pharmacy **/
    case "preventive":
    case "curative":
    case "supplement":
    case "powder":
    case "oral":
    case "injectable":
      return (
        <div className="space-y-4">
          <div>
            <Label>Drug Type</Label>
            <Input onChange={(e) => handleChange("drugType", e.target.value)} />
          </div>
          <div>
            <Label>Dosage Form</Label>
            <Input onChange={(e) => handleChange("dosageForm", e.target.value)} />
          </div>
          <div>
            <Label>Expiry Date</Label>
            <Input type="date" onChange={(e) => handleChange("expiryDate", e.target.value)} />
          </div>
        </div>
      )

    /** 🌽 Animal Feed **/
    case "feed":
    case "animal feed":
      return (
        <div className="space-y-4">
          <div>
            <Label>Feed Type</Label>
            <Input onChange={(e) => handleChange("feedType", e.target.value)} />
          </div>
          <div>
            <Label>Weight</Label>
            <Input onChange={(e) => handleChange("weight", e.target.value)} />
          </div>
          <div>
            <Label>Protein Content (%)</Label>
            <Input onChange={(e) => handleChange("protein", e.target.value)} />
          </div>
        </div>
      )

    /** 🛠️ Equipment (e.g. Tractor, Sheller, etc.) **/
    case "tractor":
    case "sheller":
    case "sprayer":
    case "knapsack sprayer":
    case "fish pond":
    case "others":
      return (
        <div className="space-y-4">
          <div>
            <Label>Condition</Label>
            <Input onChange={(e) => handleChange("condition", e.target.value)} />
          </div>
          <div>
            <Label>Year of Manufacture</Label>
            <Input type="number" onChange={(e) => handleChange("year", e.target.value)} />
          </div>
          <div>
            <Label>Usage Hours</Label>
            <Input type="number" onChange={(e) => handleChange("usageHours", e.target.value)} />
          </div>
        </div>
      )

    default:
      return <p className="text-sm text-gray-500">No additional fields required for this subcategory.</p>
  }
}
