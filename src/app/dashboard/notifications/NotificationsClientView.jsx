"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, AlertTriangle, Info, X, Clock } from "lucide-react";
import {
  deleteNotification,
  markAllNotificationsAsRead,
  updateNotifications,
} from "@/lib/actions/notifications";
import { useRouter } from "next/navigation";

export default function NotificationsClientView({
  initialNotifications,
  userEmail,
}) {
  const [notifications, setNotifications] = useState(
    initialNotifications || [],
  );
  const [isPending, startTransition] = useTransition();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeStyles = (type, isRead) => {
    if (isRead) {
      return {
        cardClass:
          "bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/50 shadow-sm",
        iconClass: "text-slate-400 dark:text-slate-500",
        titleClass: "text-slate-500 dark:text-slate-500 font-medium",
        messageClass: "text-slate-400 dark:text-slate-600",
        icon:
          type === "alert" ? (
            <AlertTriangle size={18} />
          ) : type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <Info size={18} />
          ),
      };
    }

    switch (type) {
      case "alert":
        return {
          cardClass:
            "bg-amber-50/60 dark:bg-amber-950/10 border-amber-200/60 dark:border-amber-500/20",
          iconClass: "text-amber-500",
          titleClass: "text-amber-900 dark:text-amber-400 font-semibold",
          messageClass: "text-amber-800/80 dark:text-amber-300/80",
          icon: <AlertTriangle size={18} />,
        };
      case "success":
        return {
          cardClass:
            "bg-emerald-50/60 dark:bg-emerald-950/10 border-emerald-200/60 dark:border-emerald-500/20",
          iconClass: "text-emerald-500",
          titleClass: "text-emerald-900 dark:text-emerald-400 font-semibold",
          messageClass: "text-emerald-800/80 dark:text-emerald-300/80",
          icon: <CheckCircle2 size={18} />,
        };
      case "info":
      default:
        return {
          cardClass:
            "bg-sky-50/60 dark:bg-sky-950/10 border-sky-200/60 dark:border-sky-500/20",
          iconClass: "text-sky-500",
          titleClass: "text-sky-900 dark:text-sky-400 font-semibold",
          messageClass: "text-sky-800/80 dark:text-sky-300/80",
          icon: <Info size={18} />,
        };
    }
  };
  const router = useRouter();
  const handleMarkAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );
    startTransition(async () => {
      await updateNotifications(id, userEmail);
      router.refresh();
    });
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    startTransition(async () => {
      await markAllNotificationsAsRead(userEmail);
    });
  };

  const handleDelete = async (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    startTransition(async () => {
      await deleteNotification(id, userEmail);
    });
  };

  const formatTime = (dateInput) => {
    if (!dateInput) return "";
    const now = new Date();
    const past = new Date(dateInput);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60)
      return `${diffMins || 1} hour${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {unreadCount} unread
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0 || isPending}
          className={`px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-xs font-medium tracking-wide transition-all duration-200 
            ${
              unreadCount > 0
                ? "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                : "text-slate-400 dark:text-slate-600 cursor-not-allowed"
            }`}
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3.5">
        {notifications.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/10">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              No notifications available.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { cardClass, iconClass, icon, titleClass, messageClass } =
              getTypeStyles(notification.type, notification.isRead);

            return (
              <div
                key={notification._id}
                className={`flex items-center justify-between rounded-xl p-5 border transition-all duration-300 ${cardClass}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`shrink-0 mt-0.5 ${iconClass}`}>{icon}</div>

                  <div className="space-y-1">
                    <h3
                      className={`text-sm transition-colors duration-300 ${titleClass}`}
                    >
                      {notification.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed transition-colors duration-300 ${messageClass}`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
                      <span>{formatTime(notification.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-4">
                  {!notification.isRead && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        disabled={isPending}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors cursor-pointer"
                      >
                        Mark read
                      </button>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(notification._id)}
                    disabled={isPending}
                    className="p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
