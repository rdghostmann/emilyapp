import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to subcategory image
    description: { type: String, required: true },
    href: { type: String, required: true }, // frontend link e.g. "/category/animal-mating"
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // lowercase + hyphen
    image: { type: String, required: true },
    href: { type: String, required: true }, // frontend link e.g. "/category/animal-mating"
    description: { type: String, required: true },
    subCategories: [subCategorySchema],
});

const Category =  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
