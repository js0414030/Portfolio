import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { Contact } from "@shared/schema";

export default function AdminPage() {
  const { data: contacts, isLoading, error } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Failed to load contacts</p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Contact Submissions
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {contacts?.length || 0} total submissions
            </p>
          </div>

          {!contacts || contacts.length === 0 ? (
            <Card className="p-12 text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No submissions yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Contact form submissions will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        {contact.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {contact.email}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      {contact.subject}
                    </Badge>
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      asChild
                    >
                      <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}