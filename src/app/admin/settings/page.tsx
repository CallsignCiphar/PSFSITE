"use client";

import React, { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  Settings,
  Mail,
  Shield,
  Clock,
  Database,
  Radio,
  Cookie,
  Save,
  CheckCircle2,
  Lock,
  Send,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Key,
  Globe,
  Sliders,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPlatformSettings,
  updateGeneralSettings,
  updateSecuritySettings,
  updateRetentionSettings,
  updateMaintenanceMode,
  updateIntegrationSettings,
  sendTestEmail,
  bumpCookieConsentVersion,
} from "@/app/actions/settings-actions";
import { EMAIL_TEMPLATES, EmailTemplate } from "@/lib/constants/settings";

type SettingsTab =
  | "general"
  | "email"
  | "integrations"
  | "security"
  | "retention"
  | "maintenance"
  | "cookie";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Email template state
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    EMAIL_TEMPLATES[0].key
  );
  const [testEmailOpen, setTestEmailOpen] = useState(false);
  const [testRecipient, setTestRecipient] = useState("admin@forumstrategic.com");
  const [testSending, setTestSending] = useState(false);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  // Cookie bump modal
  const [bumpModalOpen, setBumpModalOpen] = useState(false);
  const [newVersionInput, setNewVersionInput] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getPlatformSettings();
      setSettings(data);
      if (data?.cookie?.version) {
        const parts = data.cookie.version.replace("v", "").split(".");
        const nextPatch = `${parts[0]}.${parts[1]}.${parseInt(parts[2] || "0") + 1}`;
        setNewVersionInput(`v${nextPatch}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // 1. Save General
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateGeneralSettings(settings.general);
      triggerSaveNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // 2. Save Security
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSecuritySettings(settings.security);
      triggerSaveNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // 3. Save Retention
  const handleSaveRetention = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateRetentionSettings(settings.retention);
      triggerSaveNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // 4. Save Maintenance
  const handleSaveMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateMaintenanceMode(settings.maintenance);
      triggerSaveNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // 5. Save Integrations
  const handleSaveIntegrations = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateIntegrationSettings(settings.integrations);
      triggerSaveNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Test Email
  const handleSendTestEmail = async () => {
    setTestSending(true);
    setTestSuccessMessage(null);
    try {
      const res = await sendTestEmail(selectedTemplateKey, testRecipient);
      if (res.success) {
        setTestSuccessMessage(res.message || "Test email sent!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTestSending(false);
    }
  };

  // Bump Cookie Version
  const handleConfirmBumpCookie = async () => {
    if (!newVersionInput.trim()) return;
    try {
      const res = await bumpCookieConsentVersion(newVersionInput.trim());
      if (res.success) {
        setSettings((prev: any) => ({
          ...prev,
          cookie: { ...prev.cookie, version: res.version },
        }));
        setBumpModalOpen(false);
        triggerSaveNotification();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeTemplate = EMAIL_TEMPLATES.find(
    (t) => t.key === selectedTemplateKey
  );

  return (
    <AdminShell title="Platform Governance & System Settings">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-500 mb-1">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold">System Governance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold font-serif text-ink-900 tracking-tight">
                Platform Settings
              </h1>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded-sm text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Super Admin Only
              </span>
            </div>
            <p className="text-xs text-ink-600 mt-1 max-w-2xl">
              Centralised governance policies, institutional email communications, security thresholds,
              data retention purges, and emergency maintenance controls.
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Settings saved successfully</span>
            </div>
          )}
        </div>

        {/* Tab Navigation (7 Tabs matching Section 12.18) */}
        <div className="flex items-center gap-1 border-b border-line overflow-x-auto text-xs pb-px">
          {[
            { id: "general", label: "General & Desks", icon: Sliders },
            { id: "email", label: "Email Templates", icon: Mail },
            { id: "integrations", label: "Integrations & APIs", icon: Globe },
            { id: "security", label: "Security & 2FA", icon: Shield },
            { id: "retention", label: "Data Retention", icon: Database },
            { id: "maintenance", label: "Maintenance Mode", icon: Radio },
            { id: "cookie", label: "Cookie Policy", icon: Cookie },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 px-4 py-2.5 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-green-700 text-green-700 bg-white"
                    : "border-transparent text-ink-600 hover:text-ink-900 hover:bg-ivory-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {loading || !settings ? (
          <div className="p-12 text-center text-xs text-ink-400 bg-white border border-line rounded-sm">
            Loading governance configurations...
          </div>
        ) : (
          <div className="space-y-6">
            {/* TAB 1: GENERAL */}
            {activeTab === "general" && (
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="bg-white border border-line rounded-sm p-6 space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Institutional Identity & Regional Metadata
                    </h3>
                    <p className="text-xs text-ink-500">
                      Standard brand naming and display formats applied across the digital platform.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Site Name *
                      </label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            general: { ...settings.general, siteName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Institutional Tagline *
                      </label>
                      <input
                        type="text"
                        value={settings.general.tagline}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            general: { ...settings.general, tagline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Authorised Platform Timezone (Fixed)
                      </label>
                      <input
                        type="text"
                        disabled
                        value={settings.general.timezone}
                        className="w-full px-3 py-2 border border-line rounded-sm bg-ivory-100 text-ink-500 font-mono"
                      />
                      <span className="text-[11px] text-ink-400 mt-1 block">
                        Strict Pakistan Standard Time (PKT). Hardcoded for institutional synchronisation.
                      </span>
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Standard Date Format
                      </label>
                      <input
                        type="text"
                        value={settings.general.dateFormat}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            general: { ...settings.general, dateFormat: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line">
                    <h4 className="font-bold text-xs uppercase text-ink-700 mb-3 tracking-wider">
                      Departmental Contact Inboxes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Editorial Desk Email
                        </label>
                        <input
                          type="email"
                          value={settings.general.editorialEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: { ...settings.general, editorialEmail: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Advertising & Partnerships Email
                        </label>
                        <input
                          type="email"
                          value={settings.general.advertiseEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: { ...settings.general, advertiseEmail: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Legal & Copyright Email
                        </label>
                        <input
                          type="email"
                          value={settings.general.legalEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: { ...settings.general, legalEmail: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          General Inquiries Email
                        </label>
                        <input
                          type="email"
                          value={settings.general.generalEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: { ...settings.general, generalEmail: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line">
                    <h4 className="font-bold text-xs uppercase text-ink-700 mb-3 tracking-wider">
                      Academic Peer Review Parameters (Section 12.8)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Default Peer Review Duration (Days)
                        </label>
                        <input
                          type="number"
                          value={settings.general.defaultReviewDays}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: {
                                ...settings.general,
                                defaultReviewDays: parseInt(e.target.value) || 21,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                        />
                        <span className="text-[11px] text-ink-400 mt-1 block">
                          Standard window allocated to independent referees upon accepting review.
                        </span>
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Automated Referee Deadline Reminder (Days Before)
                        </label>
                        <input
                          type="number"
                          value={settings.general.reminderThresholdDays}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              general: {
                                ...settings.general,
                                reminderThresholdDays: parseInt(e.target.value) || 3,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={saving}>
                    <Save className="w-4 h-4 mr-1.5" />
                    <span>{saving ? "Saving Changes..." : "Save General Settings"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* TAB 2: EMAIL TEMPLATES */}
            {activeTab === "email" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Template List Sidebar */}
                <div className="bg-white border border-line rounded-sm p-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-ink-400 block mb-2">
                    Official PSF Email Catalogue (Appendix B)
                  </span>
                  <div className="space-y-1">
                    {EMAIL_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.key}
                        onClick={() => setSelectedTemplateKey(tmpl.key)}
                        className={`w-full text-left p-2.5 rounded-sm transition-colors text-xs ${
                          selectedTemplateKey === tmpl.key
                            ? "bg-green-50 border border-green-200 text-green-900 font-bold"
                            : "hover:bg-ivory-50 text-ink-700 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{tmpl.name}</span>
                          <span className="text-[9px] uppercase font-mono px-1 py-0.2 bg-ivory-100 rounded-sm text-ink-500">
                            {tmpl.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-ink-400 block font-mono truncate mt-0.5">
                          {tmpl.key}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template Editor & Preview */}
                <div className="md:col-span-2 bg-white border border-line rounded-sm p-6 space-y-4 text-xs">
                  {activeTemplate && (
                    <>
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <div>
                          <h3 className="font-serif font-bold text-sm text-ink-900">
                            {activeTemplate.name}
                          </h3>
                          <span className="font-mono text-[10px] text-ink-500">
                            Identifier: {activeTemplate.key}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setTestSuccessMessage(null);
                            setTestEmailOpen(true);
                          }}
                        >
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          <span>Send Test Email</span>
                        </Button>
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Subject Line *
                        </label>
                        <input
                          type="text"
                          defaultValue={activeTemplate.subject}
                          className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700 text-xs"
                        />
                      </div>

                      {/* Dynamic Variable Insertion Badges */}
                      <div>
                        <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider block mb-1.5">
                          Available Dynamic Tags (Click to copy)
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeTemplate.variables.map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => navigator.clipboard.writeText(`{{${v}}}`)}
                              className="px-2 py-0.5 bg-ivory-100 hover:bg-ivory-200 border border-line rounded-sm font-mono text-[11px] text-ink-700 font-semibold transition-colors"
                              title="Click to copy tag"
                            >
                              {`{{${v}}}`}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1">
                          Template Body (Plain text & Markdown) *
                        </label>
                        <textarea
                          rows={12}
                          defaultValue={activeTemplate.body}
                          className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 font-mono text-xs leading-relaxed focus:outline-none focus:border-green-700"
                        />
                      </div>

                      <div className="flex justify-end pt-2 border-t border-line">
                        <Button
                          variant="primary"
                          onClick={() => {
                            triggerSaveNotification();
                          }}
                        >
                          <Save className="w-4 h-4 mr-1.5" />
                          <span>Save Template</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: INTEGRATIONS */}
            {activeTab === "integrations" && (
              <form onSubmit={handleSaveIntegrations} className="space-y-6">
                <div className="bg-white border border-line rounded-sm p-6 space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Third-Party Integrations & External Service APIs
                    </h3>
                    <p className="text-xs text-ink-500">
                      Configure bot protection, social embeds, transactional emailers, and geo-ip services.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Cloudflare Turnstile */}
                    <div className="p-4 border border-line rounded-sm bg-ivory-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-900 flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-green-700" />
                          Cloudflare Turnstile (Bot Protection)
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-sm text-[10px] font-bold">
                          {settings.integrations.turnstileStatus}
                        </span>
                      </div>
                      <div>
                        <label className="block text-ink-600 mb-1">Turnstile Site Key</label>
                        <input
                          type="text"
                          value={settings.integrations.turnstileSiteKey}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                turnstileSiteKey: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 font-mono"
                        />
                      </div>
                      <span className="text-[10px] text-ink-400 block">
                        Protects contributor signup, contact, and submission forms.
                      </span>
                    </div>

                    {/* Resend Mailer */}
                    <div className="p-4 border border-line rounded-sm bg-ivory-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-900 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-green-700" />
                          Resend Transactional Mailer
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-sm text-[10px] font-bold">
                          {settings.integrations.resendStatus}
                        </span>
                      </div>
                      <div>
                        <label className="block text-ink-600 mb-1">API Key Status</label>
                        <input
                          type="password"
                          disabled
                          value="re_xxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full px-3 py-1.5 border border-line rounded-sm bg-ivory-100 text-ink-500 font-mono"
                        />
                      </div>
                      <span className="text-[10px] text-ink-400 block">
                        Verified sending domain: mail.forumstrategic.com
                      </span>
                    </div>

                    {/* YouTube API */}
                    <div className="p-4 border border-line rounded-sm bg-ivory-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-900 flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-red-600" />
                          YouTube Official Channel Embeds
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-sm text-[10px] font-bold">
                          {settings.integrations.youtubeStatus}
                        </span>
                      </div>
                      <div>
                        <label className="block text-ink-600 mb-1">Channel ID</label>
                        <input
                          type="text"
                          value={settings.integrations.youtubeChannelId}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                youtubeChannelId: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 font-mono"
                        />
                      </div>
                    </div>

                    {/* X / Twitter */}
                    <div className="p-4 border border-line rounded-sm bg-ivory-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-900 flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-ink-900" />
                          X (Twitter) Official Handle
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-sm text-[10px] font-bold">
                          CONFIGURED
                        </span>
                      </div>
                      <div>
                        <label className="block text-ink-600 mb-1">Institutional Handle</label>
                        <input
                          type="text"
                          value={settings.integrations.twitterHandle}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                twitterHandle: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-ivory-100 border border-line rounded-sm flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-ink-900 block">
                        MaxMind GeoIP Database Status
                      </span>
                      <span className="text-ink-500">
                        Last automated country/city database sync: {settings.integrations.geoIpLastSync}
                      </span>
                    </div>
                    <Button variant="outline" type="button">
                      Sync Database Now
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={saving}>
                    <Save className="w-4 h-4 mr-1.5" />
                    <span>{saving ? "Saving..." : "Save Integrations"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* TAB 4: SECURITY & 2FA */}
            {activeTab === "security" && (
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Authentication Policy & Two-Factor Enforcement
                    </h3>
                    <p className="text-ink-500">
                      Configure cryptographic requirements, session timeouts, and role-based 2FA rules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Minimum Password Length (Argon2id)
                      </label>
                      <input
                        type="number"
                        value={settings.security.minPasswordLength}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              minPasswordLength: parseInt(e.target.value) || 10,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Failed Sign-in Lockout Threshold (Attempts)
                      </label>
                      <input
                        type="number"
                        value={settings.security.lockoutThreshold}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              lockoutThreshold: parseInt(e.target.value) || 5,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Admin Session Fixed Expiry (Hours)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionAdminHours}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              sessionAdminHours: parseInt(e.target.value) || 8,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div>
                      <label className="block text-ink-700 font-semibold mb-1">
                        Contributor Session Idle Timeout (Hours)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionIdleHours}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              sessionIdleHours: parseInt(e.target.value) || 12,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>

                  {/* Mandatory 2FA Roles */}
                  <div className="pt-4 border-t border-line space-y-2">
                    <span className="font-bold text-ink-900 block">
                      Mandatory Two-Factor Authentication (2FA) by Role
                    </span>
                    <p className="text-ink-500 text-[11px]">
                      Users assigned to checked roles will be prevented from accessing the portal without an active TOTP authenticator.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {["SUPER_ADMIN", "ADMIN", "APPROVER", "SENIOR_CONTRIBUTOR", "CONTRIBUTOR", "EXPERT"].map((r) => {
                        const isMandatory = settings.security.mandatoryTwoFactorRoles.includes(r);
                        const isSuperAdmin = r === "SUPER_ADMIN";

                        return (
                          <label
                            key={r}
                            className={`flex items-center gap-2 p-2.5 rounded-sm border cursor-pointer ${
                              isMandatory ? "bg-green-50/50 border-green-200" : "bg-white border-line"
                            }`}
                          >
                            <input
                              type="checkbox"
                              disabled={isSuperAdmin}
                              checked={isMandatory}
                              onChange={() => {
                                if (isSuperAdmin) return;
                                const cur = settings.security.mandatoryTwoFactorRoles;
                                const updated = cur.includes(r)
                                  ? cur.filter((x: string) => x !== r)
                                  : [...cur, r];
                                setSettings({
                                  ...settings,
                                  security: { ...settings.security, mandatoryTwoFactorRoles: updated },
                                });
                              }}
                              className="rounded-sm border-line text-green-700 focus:ring-green-700"
                            />
                            <span className="font-mono text-[11px] font-semibold text-ink-800">
                              {r}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* IP Blocklist */}
                  <div className="pt-4 border-t border-line space-y-1">
                    <label className="block text-ink-700 font-semibold">
                      Institutional IP Blocklist (One IPv4 / IPv6 or CIDR per line)
                    </label>
                    <textarea
                      rows={4}
                      value={settings.security.ipBlocklist}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, ipBlocklist: e.target.value },
                        })
                      }
                      className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 font-mono text-xs focus:outline-none focus:border-green-700"
                      placeholder="e.g.&#10;192.0.2.1&#10;198.51.100.0/24"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={saving}>
                    <Save className="w-4 h-4 mr-1.5" />
                    <span>{saving ? "Saving..." : "Save Security Policy"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* TAB 5: DATA RETENTION */}
            {activeTab === "retention" && (
              <form onSubmit={handleSaveRetention} className="space-y-6">
                <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink-900">
                      Automated Data Retention & Document Purge Policies
                    </h3>
                    <p className="text-ink-500">
                      Automated background cron jobs purge expired sensitive files and IP addresses to maintain privacy compliance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-2">
                      <span className="font-bold text-ink-900 block">
                        Raw IP Address Retention (Days)
                      </span>
                      <p className="text-[11px] text-ink-500">
                        Visitor IP addresses are truncated after this threshold.
                      </p>
                      <input
                        type="number"
                        value={settings.retention.rawIpRetentionDays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            retention: {
                              ...settings.retention,
                              rawIpRetentionDays: parseInt(e.target.value) || 90,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-2">
                      <span className="font-bold text-ink-900 block">
                        Application ID File Purge (Days After Decision)
                      </span>
                      <p className="text-[11px] text-ink-500">
                        Uploaded CNIC/Passport ID verification files are permanently shredded.
                      </p>
                      <input
                        type="number"
                        value={settings.retention.applicationDocsRetentionDays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            retention: {
                              ...settings.retention,
                              applicationDocsRetentionDays: parseInt(e.target.value) || 30,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-2">
                      <span className="font-bold text-ink-900 block">
                        Soft-Deleted Content Purge (Days)
                      </span>
                      <p className="text-[11px] text-ink-500">
                        Deleted articles and research drafts in trash are permanently wiped.
                      </p>
                      <input
                        type="number"
                        value={settings.retention.softDeletePurgeDays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            retention: {
                              ...settings.retention,
                              softDeletePurgeDays: parseInt(e.target.value) || 30,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>

                    <div className="p-4 bg-ivory-50 border border-line rounded-sm space-y-2">
                      <span className="font-bold text-ink-900 block">
                        Activity Log Online Retention (Days)
                      </span>
                      <p className="text-[11px] text-ink-500">
                        Logs older than 730 days (2 years) are moved to cold archive.
                      </p>
                      <input
                        type="number"
                        value={settings.retention.activityLogRetentionDays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            retention: {
                              ...settings.retention,
                              activityLogRetentionDays: parseInt(e.target.value) || 730,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-line rounded-sm bg-white text-ink-900 focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={saving}>
                    <Save className="w-4 h-4 mr-1.5" />
                    <span>{saving ? "Saving..." : "Save Retention Policies"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* TAB 6: MAINTENANCE MODE */}
            {activeTab === "maintenance" && (
              <form onSubmit={handleSaveMaintenance} className="space-y-6">
                <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-ink-900">
                        Emergency Maintenance Mode Switch
                      </h3>
                      <p className="text-ink-500">
                        When enabled, all public web traffic is routed to the institutional maintenance template.
                        Only authenticated Super Admins and whitelisted IPs can access the site.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSettings({
                          ...settings,
                          maintenance: {
                            ...settings.maintenance,
                            enabled: !settings.maintenance.enabled,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.maintenance.enabled ? "bg-red-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.maintenance.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {settings.maintenance.enabled && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3 text-red-800">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <span className="font-bold block">
                          Maintenance Mode is Active!
                        </span>
                        <span className="text-[11px]">
                          Public visitors currently see the maintenance banner. Whitelisted staff may proceed normally.
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Public Notice Message *
                    </label>
                    <textarea
                      rows={3}
                      value={settings.maintenance.message}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maintenance: {
                            ...settings.maintenance,
                            message: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 text-xs focus:outline-none focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-ink-700 font-semibold mb-1">
                      Allowed Admin IP Bypasses (One IP per line)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.maintenance.allowedIps}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maintenance: {
                            ...settings.maintenance,
                            allowedIps: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-line rounded-sm bg-white text-ink-900 font-mono text-xs focus:outline-none focus:border-green-700"
                      placeholder="e.g.&#10;182.188.10.45"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={saving}>
                    <Save className="w-4 h-4 mr-1.5" />
                    <span>{saving ? "Saving..." : "Update Maintenance Mode"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* TAB 7: COOKIE POLICY */}
            {activeTab === "cookie" && (
              <div className="bg-white border border-line rounded-sm p-6 space-y-6 text-xs">
                <div>
                  <h3 className="font-serif font-bold text-sm text-ink-900">
                    Cookie & Consent Governance (Section 12.18)
                  </h3>
                  <p className="text-ink-500">
                    Bumping the policy version invalidates all existing visitor consent cookies,
                    re-prompting the interactive banner on next visit.
                  </p>
                </div>

                <div className="p-4 bg-ivory-50 border border-line rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-1">
                      Active Policy Version
                    </span>
                    <span className="font-mono text-xl font-bold text-ink-900">
                      {settings.cookie.version}
                    </span>
                    <span className="text-[11px] text-ink-500 block mt-1">
                      Last bumped: {new Date(settings.cookie.lastBumpedAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>

                  <Button variant="primary" onClick={() => setBumpModalOpen(true)}>
                    <RefreshCw className="w-4 h-4 mr-1.5" />
                    <span>Bump Version & Re-Prompt Consent</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal 1: Test Email Dispatch */}
        {testEmailOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-md p-6 space-y-4 text-xs">
              <div className="flex items-center gap-2.5 text-ink-900">
                <Send className="w-5 h-5 text-green-700" />
                <h3 className="font-serif font-bold text-base">Send Test Email</h3>
              </div>
              <p className="text-ink-600">
                Dispatch a live rendered sample of <strong>{activeTemplate?.name}</strong> with test data.
              </p>

              {testSuccessMessage && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-sm">
                  {testSuccessMessage}
                </div>
              )}

              <div>
                <label className="block font-semibold text-ink-700 mb-1">
                  Recipient Email Address *
                </label>
                <input
                  type="email"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <Button variant="outline" onClick={() => setTestEmailOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSendTestEmail} disabled={testSending}>
                  {testSending ? "Sending Test..." : "Send Test Dispatch"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Bump Cookie Version */}
        {bumpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white border border-line rounded-sm shadow-xl w-full max-w-md p-6 space-y-4 text-xs">
              <div className="flex items-center gap-2.5 text-amber-700">
                <Cookie className="w-5 h-5" />
                <h3 className="font-serif font-bold text-base text-ink-900">
                  Bump Cookie Policy Version
                </h3>
              </div>
              <p className="text-ink-600">
                This action immediately invalidates stored visitor consent cookies site-wide.
                All visitors will see the consent banner on their next page load.
              </p>

              <div>
                <label className="block font-semibold text-ink-700 mb-1">
                  New Version Identifier (SemVer) *
                </label>
                <input
                  type="text"
                  value={newVersionInput}
                  onChange={(e) => setNewVersionInput(e.target.value)}
                  placeholder="e.g. v1.3.0"
                  className="w-full px-3 py-2 border border-line rounded-sm bg-white text-ink-900 font-mono focus:outline-none focus:border-green-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <Button variant="outline" onClick={() => setBumpModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmBumpCookie}>
                  Confirm & Bump Version
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
