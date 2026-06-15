# TODO - Blog fetch/upload fixes

## Backend
- [x] Fix `server/src/routes/blogRoutes.js` to use `uploadBlogFiles` middleware on multipart create.
- [x] Align POST route with frontend: handle `POST /api/blogs` (not `/api/blogs/upload`).
- [x] Implement missing blog read endpoints expected by frontend:
  - [x] `GET /api/blogs/published?page=&limit=`
  - [x] `GET /api/blogs/admin/all`
  - [x] `GET /api/blogs/slug/:slug?published=true`
  - [x] `GET /api/blogs/search?q=&published=true/false`
- [x] Update `server/src/services/blogService.js` exports to include functions needed by new controllers.
- [x] Add/adjust controller functions in `server/src/controllers/blogController.js` for the endpoints above.


## Frontend (only if still failing after backend fixes)
- [ ] Verify `client/src/services/blogApi.js` matches backend base paths.
- [ ] If media URLs still broken, validate `mediaUrl()` and backend static `/uploads`.

## Testing
- [ ] Run backend and hit endpoints with curl (or verify via browser) to confirm responses.
- [ ] Upload a new blog from `BlogForm` and verify it appears in public Blogs list.

