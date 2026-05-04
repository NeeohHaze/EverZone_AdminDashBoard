import { useEffect, useMemo, useRef, useState } from "react";
import EntitySearchBar from "../components/admin/EntitySearchBar";
import ServiceCreateSection from "../components/services/ServiceCreateSection";
import ServiceEditorDrawer from "../components/services/ServiceEditorDrawer";
import ServiceGrid from "../components/services/ServiceGrid";
import { useServicesData } from "../hooks/useApiData";

function Services() {
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [editImageFile, setEditImageFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("everzone:navbar-visibility", {
        detail: { hidden: activeServiceId != null },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("everzone:navbar-visibility", {
          detail: { hidden: false },
        })
      );
    };
  }, [activeServiceId]);

  const {
    services,
    error,
    fetchServices,
    createService,
    updateService,
    deleteService,
  } = useServicesData(true);

  const SERVICE_IMAGE_URL = "/services_placeholder.jpg";

  const fileSummary = useMemo(() => {
    if (files.length === 0) return "";
    if (files.length === 1) return files[0]?.name ?? "";
    return `${files.length} files selected`;
  }, [files]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const openEditFilePicker = () => {
    editFileInputRef.current?.click();
  };

  const normalizeRemoteImage = (value) =>
    typeof value === "string" && /^https?:\/\//i.test(value) ? value : null;

  const addFiles = (fileList) => {
    const next = Array.from(fileList ?? []).filter((f) => f && f.type?.startsWith("image/"));
    if (next.length === 0) return;
    setFiles(next);
  };

  const addEditImages = (fileList) => {
    const nextFiles = Array.from(fileList ?? []).filter((f) => f && f.type?.startsWith("image/"));
    if (nextFiles.length === 0) return;

    const file = nextFiles[0];
    const url = URL.createObjectURL(file);
    setEditImageFile(file);
    setEditImages((prev) => {
      prev.forEach((src) => {
        if (typeof src === "string" && src.startsWith("blob:")) URL.revokeObjectURL(src);
      });
      return [url];
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer?.files);
  };

  const onBrowse = (e) => {
    addFiles(e.target.files);
  };

  const updateEditDraftField = (field, value) => {
    if (field === "image") {
      const normalized = normalizeRemoteImage(value.trim());
      setEditDraft((prev) => ({ ...(prev ?? {}), image: normalized }));
      setEditImages((prev) => {
        prev.forEach((src) => {
          if (typeof src === "string" && src.startsWith("blob:")) URL.revokeObjectURL(src);
        });
        return [];
      });
      return;
    }

    setEditDraft((prev) => ({ ...(prev ?? {}), [field]: value }));
  };

  const activeService = useMemo(() => {
    if (!activeServiceId) return null;
    return services.find((s) => s.id === activeServiceId) ?? null;
  }, [activeServiceId, services]);

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return services;

    return services.filter((service) => {
      const haystack = [service?.title, service?.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchQuery, services]);

  const closeEditService = () => {
    setActiveServiceId(null);
    setEditDraft(null);
    setEditImageFile(null);
    setShowDeleteModal(false);
    setEditImages((prev) => {
      prev.forEach((src) => {
        if (typeof src === "string" && src.startsWith("blob:")) URL.revokeObjectURL(src);
      });
      return [];
    });
  };

  const openEditService = (service) => {
    setActiveServiceId(service.id);
    setEditDraft({
      title: service.title ?? "",
      description: service.description ?? "",
      image: normalizeRemoteImage(service.image),
    });
    setEditImages([service.image || SERVICE_IMAGE_URL]);
  };

  const onEditDrop = (e) => {
    e.preventDefault();
    addEditImages(e.dataTransfer?.files);
  };

  const onEditBrowse = (e) => {
    addEditImages(e.target.files);
  };

  const resetCreateForm = () => {
    setFiles([]);
    setNewTitle("");
    setNewDescription("");
    setNewImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreate = async () => {
    const title = newTitle.trim();
    const description = newDescription.trim();
    if (!title || !description) return;

    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      // Add file if one was selected, otherwise add URL
      if (files.length > 0) {
        formData.append('image', files[0]);
      } else if (newImageUrl.trim()) {
        formData.append('image', newImageUrl.trim());
      }

      const result = await createService(formData);

      if (result?.success) {
        resetCreateForm();
        await fetchServices();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async () => {
    if (!activeServiceId || !editDraft) return;
    const title = (editDraft.title ?? "").trim();
    const description = (editDraft.description ?? "").trim();
    if (!title || !description) return;

    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      // Add file if one was selected, otherwise add existing image
      if (editImageFile) {
        formData.append('image', editImageFile);
      } else if (editDraft.image) {
        formData.append('image', editDraft.image);
      }

      const result = await updateService(activeServiceId, formData);

      if (result?.success) {
        await fetchServices();
        closeEditService();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!activeServiceId) return;

    setActionLoading(true);
    try {
      const result = await deleteService(activeServiceId);
      if (result?.success) {
        await fetchServices();
        closeEditService();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const removeEditImage = () => {
    setEditImages((prev) => {
      prev.forEach((src) => {
        if (typeof src === "string" && src.startsWith("blob:")) URL.revokeObjectURL(src);
      });
      return [];
    });
    setEditDraft((prev) => ({ ...(prev ?? {}), image: null }));
  };

  return (
    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-screen bg-white pb-8">
      <div aria-hidden="true" className="h-[54px] w-full bg-[#2c6480]" />

      <div className="relative z-10 mx-auto -mt-6 w-full">
        <div className="w-full overflow-hidden rounded-t-[44px] bg-white">
          <div className="w-full px-8 py-10 sm:px-14 lg:px-20">
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">Service Management</h1>

            <ServiceCreateSection
              fileInputRef={fileInputRef}
              fileSummary={fileSummary}
              newTitle={newTitle}
              newDescription={newDescription}
              newImageUrl={newImageUrl}
              error={error}
              actionLoading={actionLoading}
              onOpenFilePicker={openFilePicker}
              onDrop={onDrop}
              onBrowse={onBrowse}
              onTitleChange={setNewTitle}
              onDescriptionChange={setNewDescription}
              onImageUrlChange={setNewImageUrl}
              onCreate={handleCreate}
            />

            <div className="mt-10 flex items-baseline gap-3 text-slate-700">
              <span className="text-4xl font-semibold tracking-tight">{services.length}</span>
              <span className="text-[22px] font-normal text-slate-500">Services</span>
            </div>

            <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:flex-nowrap xl:items-center xl:gap-5">
              <EntitySearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
                placeholder="Search Service by name"
                clearLabel="Clear service search"
              />
            </div>

            <ServiceGrid
              services={filteredServices}
              serviceImageUrl={SERVICE_IMAGE_URL}
              onEditService={openEditService}
            />

            <ServiceEditorDrawer
              activeService={activeService}
              editDraft={editDraft}
              editImages={editImages}
              serviceImageUrl={SERVICE_IMAGE_URL}
              editFileInputRef={editFileInputRef}
              actionLoading={actionLoading}
              showDeleteModal={showDeleteModal}
              onClose={closeEditService}
              onOpenFilePicker={openEditFilePicker}
              onDrop={onEditDrop}
              onBrowse={onEditBrowse}
              onRemoveImage={removeEditImage}
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

export default Services;