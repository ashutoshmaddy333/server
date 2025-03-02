--Technologies Used--
1.Node.js
2.Express.js
3.MongoDB
4.Mongoose

|||||||||||||||||||||||||

-- 1. Add a New Product---
      Endpoint: POST /api/products/add-product

-- 2. Get All Products with Filters, Sorting, and Pagination--
     Endpoint: GET /api/products

-- 3. Get a Product by ID --
      Endpoint: GET /api/product/:id

--4. Update a Product--
     Endpoint: PUT /api/update-product/:id

--5. Update Product Status--
     Endpoint: PATCH /api/product-status/:id

--6. Delete a Product--
     Endpoint: DELETE /api/delete-product/:id

--7. Add a Review to a Product--
     Endpoint: POST /api/product/:id/review

--8. Mark a Review as Helpful
     Endpoint: PATCH /api/review/:productId/:reviewId/helpful

--9. Get Products by Tag--
    Endpoint: GET /api/products/tag/:tag

--10. Get Featured Products--
   Endpoint: GET /api/products/featured