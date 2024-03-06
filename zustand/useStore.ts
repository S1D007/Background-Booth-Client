import { create } from 'zustand';
import axios from 'axios';
import { toast } from "sonner"

type UseStoreState = {
    loading: boolean;
    response: string;
    emptyResponse: () => void;
    error: string;
    templateImage: File | null;
    setTemplateImage: (templateImage: File) => void;
    backgroundImage: File | null;
    setBackgroundImage: (backgroundImage: File) => void;
    subjectImage: File | null;
    setSubjectImage: (subjectImage: File) => void;
    process: () => void;
};

const URL = "https://bg-booth-api.gokapturehub.com/remove_background"

export const useStore = create<UseStoreState>((set) => ({
    loading: false,
    response: "",
    error: "",
    templateImage: null,
    setTemplateImage: (templateImage) => set({ templateImage }),
    backgroundImage: null,
    setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
    subjectImage: null,
    setSubjectImage: (subjectImage) => set({ subjectImage }),
    process: async () => {
        try {
            if (!useStore.getState().templateImage || !useStore.getState().backgroundImage || !useStore.getState().subjectImage) {
                toast.error("Please select all images");
                return
            }
            toast.info("Processing...");
            set({ loading: true, error: "" });
            const formData = new FormData();
            formData.append("overlay", useStore.getState().templateImage as File);
            formData.append("bg", useStore.getState().backgroundImage as File);
            formData.append("image", useStore.getState().subjectImage as File);

            const response = await axios.post(URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Processed");
            set({ response: response.data.result_url, loading: false, error: "" });
        } catch (e: any) {
            toast.error(e.message);
            set({ error: e.message, loading: false });
        }
    },
    emptyResponse: () => set({ response: "" }),
}));
