import { useNavigate } from 'react-router-dom';
import OnboardingShell from '@/components/inventory/OnboardingShell';
import IngestionStatus from '@/components/inventory/IngestionStatus';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { usePlatform } from '@/context/InventoryContext';

// Screen D: ingestion progress and data-quality checks before the analytical dashboard opens.
export default function Ingestion() {
  const navigate = useNavigate();
  const { selectedMaterial, setOnboarded } = usePlatform();
  return (
    <OnboardingShell current={4}>
      <div className="onb-card" style={{ marginBottom: 16 }}>
        <h1>Preparing your data</h1>
        <p className="sub" style={{ marginBottom: 0 }}>
          Your sources are loaded into one trusted dataset for {selectedMaterial.id} · {selectedMaterial.name}. Check the results, then open the dashboard.
        </p>
      </div>
      <IngestionStatus
        material={`${selectedMaterial.id} · ${selectedMaterial.name}`}
        onProceed={() => {
          // Data is loaded: from now on this user goes straight to the dashboard after signing in.
          setOnboarded(true);
          navigate('/solutions/inventory-intelligence/overview');
        }}
        proceedLabel="Open the dashboard"
      />

      {/* Setup is complete by now, so make going back to change it obvious. */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
        <Button variant="outline" onClick={() => navigate('/solutions/inventory-intelligence/data-foundation/connections')} className="gap-1.5">
          <ArrowLeft size={14} aria-hidden="true" /> Back to data sources
        </Button>
        <button
          type="button"
          onClick={() => navigate('/solutions/inventory-intelligence/data-foundation/parameters')}
          className="text-[13px] font-semibold text-primary hover:text-ink underline underline-offset-4 cursor-pointer"
        >
          Change parameters
        </button>
      </div>
    </OnboardingShell>
  );
}
