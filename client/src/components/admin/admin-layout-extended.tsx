import { ReactNode } from 'react';
import AdminLayout from './admin-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface AdminLayoutExtendedProps {
  children: ReactNode;
  title: string;
  description: string;
  backButton?: boolean;
  backButtonLink?: string;
}

export default function AdminLayoutExtended({
  children,
  title,
  description,
  backButton = false,
  backButtonLink = '/admin',
}: AdminLayoutExtendedProps) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          
          {backButton && (
            <Link href={backButtonLink}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                Volver
              </Button>
            </Link>
          )}
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </AdminLayout>
  );
}