import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCreateSection from "../components/projects/ProjectCreateSection";
import ProjectEditorDrawer from "../components/projects/ProjectEditorDrawer";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectsToolbar from "../components/projects/ProjectsToolbar";
import { useCategoriesData, useProjectsData } from "../hooks/useApiData";

function Projects() {
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [editImageFile, setEditImageFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("everzone:navbar-visibility", {
        detail: { hidden: activeProjectId != null },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("everzone:navbar-visibility", {
          detail: { hidden: false },
        })
      );
    };
  }, [activeProjectId]);

  const [newDraft, setNewDraft] = useState({
    title: "",
    name: "",
    category_id: "",
    location: "",
    duration: "",
    area: "",
    description: "",
    image: "",
  });

  const {
    projects,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  } = useProjectsData(true);

  const {
    categories,
    error: categoriesError,
    loading: categoriesLoading,
    fetchCategories,
    createCategory,
  } = useCategoriesData(false);

  const didSeedCategoriesRef = useRef(false);

  const PROJECT_IMAGE_URL = "/guesthouse.jpg";

  const normalizeRemoteImage = (value) =>
    typeof value === "string" && /^https?:\/\//i.test(value) ? value : null;

  useEffect(() => {
    if (newDraft.category_id) return;
    const firstId = categories?.[0]?.id;
    if (!firstId) return;
    setNewDraft((prev) => ({ ...prev, category_id: String(firstId) }));
  }, [categories, newDraft.category_id]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (didSeedCategoriesRef.current) return;
    if (categoriesLoading) return;
    if (categoriesError) return;

    const desired = ["Residential", "Commercial", "Industrial"];
    const existing = new Set(
      (categories ?? [])
        .map((c) => (c?.name ?? "").trim().toLowerCase())
        .filter(Boolean)
    );
    const missing = desired.filter((name) => !existing.has(name.toLowerCase()));

    if (missing.length === 0) {
      didSeedCategoriesRef.current = true;
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) return;

    didSeedCategoriesRef.current = true;

    (async () => {
      for (const name of missing) {
        await createCategory({ name, description: null });
      }
      await fetchCategories();
    })();
  }, [categories, categoriesLoading, categoriesError, createCategory, fetchCategories]);

  const categoryTabs = useMemo(() => {
    const names = (categories ?? [])
      .map((c) => c?.name)
      .filter(Boolean);
    return ["All", ...names];
  }, [categories]);

  const showcaseProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return (projects ?? []).filter((project) => {
      if (activeCategory !== "All" && project?.category_name !== activeCategory) {
        return false;
      }

      if (!query) return true;

      return String(project?.name ?? "").toLowerCase().includes(query);
    });
  }, [activeCategory, projects, searchQuery]);

  const fileSummary = useMemo(() => {
    if (files.length === 0) return "";
    if (files.length === 1) return files[0]?.name ?? "";
    return `${files.length} files selected`;
  }, [files]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const addFiles = (fileList) => {
    const next = Array.from(fileList ?? []).filter((f) => f && f.type?.startsWith("image/"));
    if (next.length === 0) return;
    setFiles(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer?.files);
  };

  const onBrowse = (e) => {
    addFiles(e.target.files);
  };

  const updateNewDraftField = (field, value) => {
    setNewDraft((prev) => ({ ...prev, [field]: value }));
  };

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return (projects ?? []).find((p) => p.id === activeProjectId) ?? null;
  }, [activeProjectId, projects]);

  const closeEditProject = () => {
    setActiveProjectId(null);
    setEditDraft(null);
    setEditImageFile(null);
    setShowDeleteModal(false);
    setEditImages([]);
  };

  const openEditProject = (project) => {
    setActiveProjectId(project.id);
    setEditDraft({
      title: project.title ?? "",
      name: project.name ?? "",
      category_id: project.category_id ? String(project.category_id) : "",
      location: project.location ?? "",
      duration: project.duration ?? "",
      area: project.area ?? "",
      description: project.description ?? "",
      image: normalizeRemoteImage(project.image) ?? "",
    });
    const seed = project.image || PROJECT_IMAGE_URL;
    setEditImages([seed, seed, seed, seed]);
  };

  const openEditFilePicker = () => {
    editFileInputRef.current?.click();
  };

  const addEditImages = (fileList) => {
    const nextFiles = Array.from(fileList ?? []).filter((f) => f && f.type?.startsWith("image/"));
    if (nextFiles.length === 0) return;

    // Store the first file for uploading
    setEditImageFile(nextFiles[0]);

    const urls = nextFiles.map((f) => URL.createObjectURL(f));
    setEditImages((prev) => {
      const merged = [...urls, ...prev].slice(0, 4);
      return merged;
    });
  };

  const onEditDrop = (e) => {
    e.preventDefault();
    addEditImages(e.dataTransfer?.files);
  };

  const onEditBrowse = (e) => {
    addEditImages(e.target.files);
  };

  const updateEditDraftField = (field, value) => {
    setEditDraft((prev) => ({ ...(prev ?? {}), [field]: value }));
  };

  const resetCreateForm = () => {
    setFiles([]);
    setNewDraft((prev) => ({
      ...prev,
      title: "",
      name: "",
      location: "",
      duration: "",
      area: "",
      description: "",
      image: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canCreate =
    newDraft.title.trim() &&
    newDraft.name.trim() &&
    String(newDraft.category_id || "").trim() &&
    newDraft.description.trim();

  const handleCreate = async () => {
    if (!canCreate) return;
    const categoryId = Number.parseInt(newDraft.category_id, 10);
    if (!Number.isFinite(categoryId) || categoryId <= 0) return;

    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', newDraft.name.trim());
      formData.append('title', newDraft.title.trim());
      formData.append('category_id', categoryId);
      formData.append('location', newDraft.location.trim() || '');
      formData.append('duration', newDraft.duration.trim() || '');
      formData.append('area', newDraft.area.trim() || '');
      formData.append('description', newDraft.description.trim());
      
      // Add file if one was selected, otherwise add URL
      if (files.length > 0) {
        formData.append('image', files[0]);
      } else if (newDraft.image.trim()) {
        formData.append('image', newDraft.image.trim());
      }

      const result = await createProject(formData);

      if (result?.success) {
        resetCreateForm();
        await fetchProjects();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async () => {
    if (!activeProjectId || !editDraft) return;
    const categoryId = Number.parseInt(editDraft.category_id, 10);
    if (!Number.isFinite(categoryId) || categoryId <= 0) return;

    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', (editDraft.name ?? "").trim());
      formData.append('title', (editDraft.title ?? "").trim());
      formData.append('category_id', categoryId);
      formData.append('location', (editDraft.location ?? "").trim() || '');
      formData.append('duration', (editDraft.duration ?? "").trim() || '');
      formData.append('area', (editDraft.area ?? "").trim() || '');
      formData.append('description', (editDraft.description ?? "").trim());
      
      // Add file if one was selected, otherwise add existing image
      if (editImageFile) {
        formData.append('image', editImageFile);
      } else if (editDraft.image) {
        formData.append('image', (editDraft.image ?? "").trim());
      }

      const result = await updateProject(activeProjectId, formData);

      if (result?.success) {
        await fetchProjects();
        closeEditProject();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!activeProjectId) return;

    setActionLoading(true);
    try {
      const result = await deleteProject(activeProjectId);
      if (result?.success) {
        await fetchProjects();
        closeEditProject();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const removeEditImageAt = (index) => {
    setEditImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-screen bg-white pb-8">
      <div aria-hidden="true" className="h-[54px] w-full bg-[#2c6480]" />

      <div className="relative z-10 mx-auto -mt-6 w-full">
        <div className="w-full overflow-hidden rounded-t-[44px] bg-white">
          <div className="w-full px-8 py-10 sm:px-14 lg:px-20">
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
              Projects Management
            </h1>

            <ProjectCreateSection
              newDraft={newDraft}
              categories={categories}
              error={error}
              categoriesError={categoriesError}
              fileInputRef={fileInputRef}
              fileSummary={fileSummary}
              actionLoading={actionLoading}
              canCreate={canCreate}
              onDraftChange={updateNewDraftField}
              onOpenFilePicker={openFilePicker}
              onDrop={onDrop}
              onBrowse={onBrowse}
              onCreate={handleCreate}
            />

            <ProjectsToolbar
              projectCount={projects.length}
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              categoryTabs={categoryTabs}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery("")}
              onSelectCategory={setActiveCategory}
            />

            <ProjectGrid
              projects={showcaseProjects}
              projectImageUrl={PROJECT_IMAGE_URL}
              onEditProject={openEditProject}
            />

            <ProjectEditorDrawer
              activeProject={activeProject}
              editDraft={editDraft}
              categories={categories}
              editImages={editImages}
              projectImageUrl={PROJECT_IMAGE_URL}
              editFileInputRef={editFileInputRef}
              actionLoading={actionLoading}
              showDeleteModal={showDeleteModal}
              onClose={closeEditProject}
              onOpenFilePicker={openEditFilePicker}
              onDrop={onEditDrop}
              onBrowse={onEditBrowse}
              onRemoveImage={removeEditImageAt}
              onDraftChange={updateEditDraftField}
              onShowDelete={() => setShowDeleteModal(true)}
              onHideDelete={() => setShowDeleteModal(false)}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;