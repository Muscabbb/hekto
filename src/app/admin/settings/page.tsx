"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Database, Mail, Shield, Globe } from "lucide-react";
import { Loading } from "@/components/ui/loading";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  maintenanceMode: boolean;
  elasticsearchUrl: string;
  elasticsearchApiKey: string;
  indexName: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "HEKTO",
    siteDescription: "Your premier e-commerce destination",
    contactEmail: "admin@hekto.com",
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    elasticsearchUrl: "",
    elasticsearchApiKey: "",
    indexName: "hekto"
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading text="Loading settings..." size="lg" variant="skeleton" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSaveSettings} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableNotifications">Enable Notifications</Label>
                <p className="text-sm text-gray-500">Send email notifications for important events</p>
              </div>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleInputChange('enableNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAnalytics">Enable Analytics</Label>
                <p className="text-sm text-gray-500">Track user interactions and behavior</p>
              </div>
              <Switch
                id="enableAnalytics"
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => handleInputChange('enableAnalytics', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable the site for maintenance</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Elasticsearch Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Elasticsearch Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="elasticsearchUrl">Elasticsearch URL</Label>
                <Input
                  id="elasticsearchUrl"
                  value={settings.elasticsearchUrl}
                  onChange={(e) => handleInputChange('elasticsearchUrl', e.target.value)}
                  placeholder="https://your-elasticsearch-url.com"
                />
              </div>
              <div>
                <Label htmlFor="indexName">Index Name</Label>
                <Input
                  id="indexName"
                  value={settings.indexName}
                  onChange={(e) => handleInputChange('indexName', e.target.value)}
                  placeholder="hekto"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="elasticsearchApiKey">API Key</Label>
              <Input
                id="elasticsearchApiKey"
                type="password"
                value={settings.elasticsearchApiKey}
                onChange={(e) => handleInputChange('elasticsearchApiKey', e.target.value)}
                placeholder="Your Elasticsearch API key"
              />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-yellow-600 mr-2">⚠️</div>
                <div>
                  <h4 className="font-medium text-yellow-800">Security Notice</h4>
                  <p className="text-sm text-yellow-700">
                    API keys and sensitive configuration should be stored in environment variables for production use.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-blue-600 mr-2">ℹ️</div>
                <div>
                  <h4 className="font-medium text-blue-800">Email Setup</h4>
                  <p className="text-sm text-blue-700">
                    Email configuration is handled through environment variables. 
                    Configure your SMTP settings in your deployment environment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}