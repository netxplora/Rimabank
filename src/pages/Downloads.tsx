
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Smartphone, Shield } from "lucide-react";

export default function Downloads() {
    return (
        <Layout>
            <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero-home.png"
                        alt="Rima MFB Downloads"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                        Downloads & <span className="text-secondary">Resources</span>
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        Access official forms, applications, and important regulatory documents from Rima Microfinance Bank.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Mobile Apps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Smartphone className="h-5 w-5 text-primary" />
                                    Mobile Applications
                                </CardTitle>
                                <CardDescription>Banking on the go</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full justify-start" variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for Android (APK)
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for iOS
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Account Forms */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Account Forms
                                </CardTitle>
                                <CardDescription>For offline registration and updates</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Individual Account Opening Form
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Corporate Account Opening Form
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Mandate Update Form
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Regulatory */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Policies & Disclosures
                                </CardTitle>
                                <CardDescription>Important information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Terms and Conditions (PDF)
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Privacy Policy (PDF)
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    CBN Consumer Protection Framework
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
