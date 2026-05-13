import "dotenv/config";
import Boutique from "../models/Boutique.js";

// ─── CREATE BOUTIQUE (Owner only) ──────────────────
export const createBoutique = async (req, res) => {
  try {
    const { name, description, location, phone, category } = req.body;

    // Check if owner already has a boutique
    const existing = await Boutique.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "You already have a boutique" });
    }

    const boutique = await Boutique.create({
      owner: req.user.id,   // comes from JWT token
      name,
      description,
      location,
      phone,
      category
    });

    res.status(201).json({
      message: "Boutique created successfully",
      boutique
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── GET ALL BOUTIQUES (Everyone can see) ──────────
export const getAllBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find({ isApproved: true })
      .populate("owner", "name email");  // shows owner name + email

    res.status(200).json(boutiques);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── GET SINGLE BOUTIQUE ───────────────────────────
export const getBoutiqueById = async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.params.id)
      .populate("owner", "name email");

    if (!boutique) {
      return res.status(404).json({ message: "Boutique not found" });
    }

    res.status(200).json(boutique);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── GET MY BOUTIQUE (Owner sees their own) ────────
export const getMyBoutique = async (req, res) => {
  try {
    const boutique = await Boutique.findOne({ owner: req.user.id });

    if (!boutique) {
      return res.status(404).json({ message: "You have no boutique yet" });
    }

    res.status(200).json(boutique);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── UPDATE BOUTIQUE (Owner only) ──────────────────
export const updateBoutique = async (req, res) => {
  try {
    const boutique = await Boutique.findOne({ owner: req.user.id });

    if (!boutique) {
      return res.status(404).json({ message: "Boutique not found" });
    }

    // Update only fields that are sent
    const { name, description, location, phone, category } = req.body;
    if (name) boutique.name = name;
    if (description) boutique.description = description;
    if (location) boutique.location = location;
    if (phone) boutique.phone = phone;
    if (category) boutique.category = category;

    await boutique.save();

    res.status(200).json({
      message: "Boutique updated successfully",
      boutique
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};