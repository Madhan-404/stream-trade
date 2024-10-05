import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ParsedStream } from '@/utils/streamflowUtils';

interface StreamOptionsModalProps {
  stream: ParsedStream;
  isOpen: boolean;
  onClose: () => void;
}

export function StreamOptionsModal({ stream, isOpen, onClose }: StreamOptionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stream Options</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Button variant="outline">Transfer</Button>
          <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
          <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">List</Button>
          <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white">Delist</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
