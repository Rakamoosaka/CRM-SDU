import { toast } from "sonner";

// Notify when a project is accepted
export const NotifyAccepted = () => {
  toast.success("Project accepted successfully!", {
    style: {
      backgroundColor: "#33ADA9", // Success background
      color: "#ffffff", // White text
    },
  });
};

// Notify when a project is rejected
export const NotifyRejected = () => {
  toast.error("Project rejected.", {
    style: {
      backgroundColor: "#FF6B6B", // Error background
      color: "#ffffff", // White text
    },
  });
};

// Notify when a project is started
export const NotifyStarted = () => {
  toast.success("Project started!", {
    style: {
      backgroundColor: "#4CAF50", // Green background
      color: "#ffffff", // White text
    },
  });
};

// Notify when a project is completed
export const NotifyCompleted = () => {
  toast.success("Project completed!", {
    style: {
      backgroundColor: "#00A9FF", // Blue background
      color: "#ffffff", // White text
    },
  });
};
