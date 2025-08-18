"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface FormGeneratorProps {
  category: string
  subcategory: string
  onChange: (details: any) => void
}

export default function FormGenerator({ category, subcategory, onChange }: FormGeneratorProps) {
  const [details, setDetails] = useState<any>({})

  const handleChange = (field: string, value: any) => {
    const updated = { ...details, [field]: value }
    setDetails(updated)
    onChange(updated) // pass to parent
  }

  if (!subcategory) return null

  switch (subcategory) {
    case "animal-mating":
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

    case "animal-pharmacy":
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

    case "animal-feed":
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

    // 🔥 Add other cases for livestock, food, fruits, etc.
    default:
      return <p className="text-sm text-gray-500">No additional fields required for this subcategory.</p>
  }
}
