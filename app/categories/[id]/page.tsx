"use client";
import { useParams } from "next/navigation";

const categoryDetails = {
  "equipment-machines": {
    title: "Equipment & Machines",
    description: "Find new and used tractors, shellers, sprayers, and more.",
    properties: [
      { label: "Condition", values: ["New", "Used"] },
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Other"] },
      { label: "Fuel Type", values: ["Diesel", "Petrol", "Manual"] },
      { label: "Brand", values: [] },
    ],
  },
  fertilizers: {
    title: "Fertilizers",
    description: "Browse a variety of fertilizers for your crops.",
    properties: [
      { label: "Fertilizer Type", values: ["NPK", "Urea", "Organic"] },
      { label: "Application Use", values: ["Soil", "Foliar"] },
      { label: "Pack Size", values: [] },
    ],
  },
  "chemicals-insecticides-pesticides": {
    title: "Chemicals / Insecticides & Pesticides",
    description: "Find herbicides, insecticides, fungicides and more.",
    properties: [
      { label: "Chemical Type", values: ["Herbicides", "Insecticides", "Fungicides"] },
      { label: "Application Type", values: [] },
    ],
  },
  "fruits-vegetables": {
    title: "Fruits & Vegetables",
    description: "Fresh and dried fruits and vegetables.",
    properties: [
      { label: "Type", values: ["Fruit", "Vegetable"] },
      { label: "Form", values: ["Fresh", "Dried", "Packaged"] },
      { label: "Harvest Date", values: [] },
    ],
  },
  "livestock-pets": {
    title: "Livestock & Pets",
    description: "Find poultry, cattle, and other animals.",
    properties: [
      { label: "Animal Type", values: ["Poultry", "Cattle", "Goat", "Other"] },
      { label: "Breed", values: [] },
      { label: "Age Range", values: [] },
      { label: "Health Status / Vaccination", values: [] },
    ],
  },
  "animal-mating": {
    title: "Animal Mating",
    description: "Animal mating and insemination services.",
    properties: [
      { label: "Animal Type", values: ["Dog", "Goat", "Pig"] },
      { label: "Insemination Services", values: ["Mobile AI Service"] },
      { label: "Breed Type", values: [] },
      { label: "Age", values: [] },
      { label: "Service Type", values: ["Natural", "Artificial"] },
    ],
  },
  "ornamental-crops": {
    title: "Ornamental Crops",
    description: "Browse ornamental crops and flowers.",
    properties: [],
  },
  seedlings: {
    title: "Seedlings",
    description: "Browse a variety of seedlings for your farm.",
    properties: [
      { label: "Crop Type", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
      { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
      { label: "Type", values: ["Hybrid", "Open-pollination"] },
    ],
  },
  services: {
    title: "Services",
    description: "Find agricultural services.",
    properties: [
      { label: "Service Type", values: ["Tractor Hiring", "Farm Setup", "Veterinary"] },
      { label: "Area Coverage", values: ["Local", "State Wide", "National Wide"] },
      { label: "Availability", values: ["On-demand", "Booking"] },
    ],
  },
  "animal-pharmacy": {
    title: "Animal Pharmacy",
    description: "Animal health and pharmacy products.",
    properties: [
      { label: "Type of Animal", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
  },
  "animal-accessories": {
    title: "Animal Accessories",
    description: "Accessories for animals and pets.",
    properties: [
      { label: "Accessories", values: ["Poultry Drinkers", "Bird Cage", "Other"] },
      { label: "Animal Type", values: ["Dog", "Pig", "Other"] },
      { label: "Use", values: ["Feeding", "Transporting", "Housing"] },
    ],
  },
  "animal-feeds": {
    title: "Animal Feeds",
    description: "Animal feeds for all types of livestock.",
    properties: [
      { label: "Animal Type", values: [] },
      { label: "Feed Type", values: [] },
      { label: "Bag Size", values: ["10kg", "25kg", "50kg"] },
      { label: "Brand", values: ["Top Feeds", "Vital", "Other"] },
    ],
  },
  "agro-insurance": {
    title: "Agro Insurance",
    description: "Insurance products for agriculture.",
    properties: [],
  },
};

export default function CategoryPage() {
  const { id } = useParams();
  const details = categoryDetails[id] || {
    title: id?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    description: "Browse items in this category.",
    properties: [],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{details.title}</h1>
      <p className="mb-4 text-gray-600">{details.description}</p>
      {details.properties.length > 0 && (
        <div className="space-y-4">
          {details.properties.map((prop) => (
            <div key={prop.label}>
              <span className="font-semibold">{prop.label}:</span>{" "}
              {prop.values.length > 0 ? prop.values.join(", ") : <span className="text-gray-400">Any</span>}
            </div>
          ))}
        </div>
      )}
      {/* Here you can add a ProductFeed or listing for this category */}
    </div>
  );
}