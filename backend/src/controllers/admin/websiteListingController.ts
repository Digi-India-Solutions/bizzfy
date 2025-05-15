import { Request, Response } from "express";
import { deleteImage, uploadImage } from "../../utils/cloudinary";
import { deleteLocalFile } from "../../utils/deleteImageFromLocalFolder";
import WebsiteListing from "../../models/WebsiteListingModel";

export const createDetails = async (req: Request, res: Response) => {
    try {
        console.log("BODY:-", req.body);

        const { companyName, website, shortDescription,
            // aboutBusiness, 
            // area,
             service, userId } = req.body;

        // Validate required fields
        if (!companyName || !website || !shortDescription ||  !service) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        // Handle single image file
        const file = (req.file || (req.files && Array.isArray(req.files) && req.files[0])) as Express.Multer.File | undefined;
        let imageUrl = "";

        if (file) {
            imageUrl = await uploadImage(file.path);
            deleteLocalFile(file.path);
        }

        // Create the business listing (initial phase)
        const listing = new WebsiteListing({
            companyName,
            website,
            shortDescription,
            // aboutBusiness,
            // area,
            userId,
            service: Array.isArray(service) ? service : [service],
            logo: imageUrl || "",
        });

        await listing.save();

        res.status(201).json({
            message: "Business listing created successfully",
            status: true,
            data: listing,
        });
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Error creating business listing:", err);
        res.status(500).json({
            message: "Failed to create business listing",
            status: false,
            error: err.message,
        });
    }
};
export const createAdditionalInformation = async (req: Request, res: Response) => {
    try {
        console.log("BODY:-", req.body);

        const { category, subCategory, serviceArea, listingId } = req.body;

        // Validate required fields
        if (!category || !subCategory || !serviceArea || !listingId) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        // Find the listing
        const listing = await WebsiteListing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Business listing not found", status: false });
        }

        // Handle multiple photo uploads
        // const files = req.files as Express.Multer.File[] | undefined;
        // let businessPhotoUrls: string[] = [];

        // if (files && Array.isArray(files)) {
        //     for (const file of files) {
        //         const imageUrl = await uploadImage(file.path);
        //         businessPhotoUrls.push(imageUrl);
        //         deleteLocalFile(file.path);
        //     }
        // }

        // Update listing fields
        listing.category = category;
        listing.subCategory = subCategory;
        listing.serviceArea = serviceArea;

        // if (businessPhotoUrls.length > 0) {
        //     listing.businessPhotos = businessPhotoUrls;
        // }

        await listing.save();

        res.status(200).json({ message: "Additional business info updated successfully", status: true, data: listing, });

    } catch (error: unknown) {
        const err = error as Error;
        console.error("Error updating business listing:", err);
        res.status(500).json({
            message: "Failed to update business listing",
            status: false,
            error: err.message,
        });
    }
};
export const getAllWebsiteListings = async (req: Request, res: Response) => {
    try {
        const listings = await WebsiteListing.find()
            .sort({ createdAt: -1 })
            .populate('category')
            .populate('subCategory')
            .populate("userId");

        console.log("XXXXXXXX", listings)
        res.status(200).json({ status: true, message: "Listings fetched successfully", data: listings });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching listings", error: err.message });
    }
};
export const getAllWebsiteListingsById = async (req: Request, res: Response) => {
    try {
        const listing = await WebsiteListing.findById(req.params.id).populate("category").populate("subCategory").populate("userId");
        if (!listing) return res.status(404).json({ message: "Not found" });

        res.status(200).json({ data: listing, status: true, message: "Listing fetched successfully" });

    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching listings", error: err.message });
    }
};
export const deleteWebsiteListing = async (req: Request, res: Response) => {
    try {
        const listing = await WebsiteListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Delete all business photos if they exist
        const images: string[] = listing.businessPhotos || [];
        const logo: string = listing.logo || ""

        for (const img of images) {
            try {
                await deleteImage(img); // Assuming deleteImage returns a promise
            } catch (fileErr) {
                console.error("Error deleting file:", fileErr);
            }
        }
        if (logo) {
            try {
                await deleteImage(logo); // Assuming deleteImage returns a promise
            } catch (fileErr) {
                console.error("Error deleting file:", fileErr);
            }
        }

        // Delete the listing from DB
        await WebsiteListing.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: true, message: "Listing deleted", data: listing, });

    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error deleting listing", error: err.message });
    }
};
export const updateWebsiteListingStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ status: false, message: "New status is required" });
        }

        const listing = await WebsiteListing.findByIdAndUpdate(req.params.id, { "status": status }, { new: true });

        if (!listing) {
            return res.status(404).json({ status: false, message: "Website listing not found" });
        }

        res.status(200).json({ status: true, message: "Website listing status updated successfully", data: listing, });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching listings", error: err.message });
    }
};
export const listingBulkAction = async (req: Request, res: Response) => {
    try {
        const { ids, action } = req.body;
        console.log("action:-", ids, action)
        if (!ids || !action) {
            return res.status(400).json({ status: false, message: "Ids and action are required" });
        }

        if (action === "Delete") {
            await WebsiteListing.deleteMany({ _id: { $in: ids } });
            return res.status(200).json({ status: true, message: "Listings deleted successfully" });
        }

        if (action === "Rejected" || action === "Approved") {
            await WebsiteListing.updateMany({ _id: { $in: ids } }, { "status": action });
            return res.status(200).json({ status: true, message: "Listings status successfully" });
        }

    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
export const searchWebsiteListings = async (req: Request, res: Response) => {
    const { query = "", pincode, title = '' } = req.query;

    console.log("Incoming search:", { query, pincode, title });

    if (!pincode || typeof pincode !== "string") {
        return res.status(400).json({ status: false, error: "'pincode' is required." });
    }

    try {
        const regex = new RegExp(query as string, "i");
        let listings: any[] = [];

        if (title === "CityPage") {
            console.log("CityPage")
            // Fetch all listings with the given pincode
            const allByPincode = await WebsiteListing.find({ "serviceArea": pincode }).populate("category subCategory");

            listings = allByPincode.filter((listing: any) => {
                return (
                    listing?.category?.name?.toLowerCase() === (query as string).toLowerCase()
                );
            });
        } else {
            console.log("CityPage console.log(CityPage)")
            // General search by text query and pincode
            listings = await WebsiteListing.find({
                $and: [
                    {
                        $or: [
                            { "companyName": regex },
                            // { "area": regex },
                            { "service": { $in: [regex] } },
                            { "serviceArea": regex },
                        ]
                    },
                    { "serviceArea": pincode }
                ]
            }).populate("category subCategory userId");
        }

        // Only include Published or Approved listings
        const filteredListings = listings.filter((listing: any) => {
            const status = listing?.status;
            return status === "Approved";
        });

        console.log("filteredListings", filteredListings)
        return res.status(200).json({ status: true, data: filteredListings });
    } catch (error: any) {
        console.error("Search error:", error.message);
        return res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

export const getAllWebsiteListingsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const listings = await WebsiteListing.find({ "userId": userId })
            .populate("category")
            .populate("subCategory")

        if (!listings || listings.length === 0) {
            return res.status(404).json({ status: false, message: "No listings found for this user.", });
        }
        res.status(200).json({ status: true, message: "Listings fetched successfully", data: listings, });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ status: false, message: "Internal server error", error: err.message, });
    }
};

// export const updateAllListingsById = async (req: Request, res: Response) => {
//   try {
//     const listingId = req.params.id;
//     const existingListing = await BusinessListing.findById(listingId);

//     if (!existingListing) {
//       return res.status(404).json({ status: false, message: "Listing not found" });
//     }

//     const files = req.files as Express.Multer.File[] || [];
//     const {
//       contactPerson,
//       businessDetails,
//       businessCategory,
//       upgradeListing,
//     } = req.body;

//     // Utility to parse stringified JSON
//     const parseIfJson = (data: any) => {
//       try {
//         return typeof data === "string" ? JSON.parse(data) : data;
//       } catch {
//         return data;
//       }
//     };

//     const parsedContact = parseIfJson(contactPerson);
//     const parsedDetails = parseIfJson(businessDetails);
//     const parsedCategory = parseIfJson(businessCategory);
//     const parsedUpgrade = parseIfJson(upgradeListing);

//     // Extract files with fieldname `businessImages`
//     const uploadedImageFiles = files.filter(file =>
//       file.fieldname.startsWith("businessImages")
//     );

//     let imageUrls: string[] = [];

//     if (uploadedImageFiles.length > 0) {
//       // Delete old images before uploading new ones
//       if (existingListing.businessCategory?.businessImages?.length > 0) {
//         for (const oldImage of existingListing.businessCategory.businessImages) {
//           await deleteImage(oldImage);
//         }
//       }

//       // Upload new images
//       for (const file of uploadedImageFiles) {
//         const uploadedUrl = await uploadImage(file.path);
//         imageUrls.push(uploadedUrl);
//         deleteLocalFile(file.path);
//       }

//       parsedCategory.businessImages = imageUrls;
//     } else {
//       // No new images uploaded, keep existing images
//       parsedCategory.businessImages = existingListing.businessCategory?.businessImages || [];
//     }

//     // Perform the update
//     const updated = await BusinessListing.findByIdAndUpdate(
//       listingId,
//       {
//         contactPerson: parsedContact,
//         businessDetails: parsedDetails,
//         businessCategory: parsedCategory,
//         upgradeListing: parsedUpgrade,
//         faq: JSON.parse(req?.body?.faq) || req?.body?.faq
//       },
//       { new: true }
//     );

//     return res.status(200).json({ status: true, message: "Listing updated successfully", data: updated, });

//   } catch (error: unknown) {
//     const err = error as Error;
//     return res.status(500).json({ status: false, message: "Error updating listing", error: err.message, });
//   }
// };



// export const changePublishStatus = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ status: false, message: "New status is required" });
//     }

//     const listing = await BusinessListing.findByIdAndUpdate(
//       req.params.id,
//       { "businessDetails.publishedDate": status },
//       { new: true }
//     );

//     if (!listing) {
//       return res.status(404).json({ status: false, message: "Business listing not found" });
//     }

//     res.status(200).json({
//       status: true,
//       message: "Business listing status updated successfully",
//       data: listing,
//     });
//   } catch (err: any) {
//     console.error("Error updating business listing status:", err);
//     res.status(500).json({
//       status: false,
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };

export const increaseClickCountWebsiteListing = async (req: Request, res: Response) => {
//   try {
//     const {  user } = req.body;
//     const Id = req.params.id;
   
//     if (!user) {
//       return res.status(400).json({ status: false, message: "Missing userId in body." });
//     }
//     const business = await WebsiteListing.findById(Id);
//     if (!business) {
//       return res.status(404).json({ status: false, message: "Business not found." });
//     }

//     // Ensure clickCounts is initialized
//     if (!business.cliCkCount) {
//       business.cliCkCount = {} as any;
//     }

//     // Ensure the specific click type is initialized
//     if (!business.cliCkCount[type]) {
//       business.cliCkCount[type] = {
//         count: 0,
//         user: [],
//       };
//     }

//     // If user is not an array (corrupted), convert it
//     if (!Array.isArray(cliCkCount[type].user)) {
//         cliCkCount[type].user = cliCkCount[type].user
//         ? [cliCkCount[type].user]
//         : [];
//     }

//     // Only add user if not already present
//     if (!cliCkCount[type].user.some((u: any) => u.toString() === user)) {
//         cliCkCount[type].user.push(user);
//     }

//     // Increment the click count
//     cliCkCount[type].count += 1;

//     await business.save();

//     return res.status(200).json({
//       status: true,
//       message: `${type} click count incremented.`,
//       updatedCounts: cliCkCount[type],
//     });
//   } catch (error: any) {
//     console.error("Click count error:", error);
//     return res.status(500).json({ status: false, message: error.message || "Server error." });
//   }
};
