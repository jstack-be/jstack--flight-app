import {useEffect, useRef, useState} from "react";
import {Flight} from "@/app/domain/dashboard/flights/flight.types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

export function RefreshDialog({flights,fetchData}: { flights: Flight[], fetchData: () => void}) {
    const t = useTranslations('RefreshDialog');
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear the previous timeout if it exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsOpen(true);
        }, 600000); // 10 minutes

        // Clear timeout when component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [flights]);

    const refreshData = () => {
        fetchData();
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={"bg-primary"}>
                <DialogHeader>
                    <DialogTitle>{t('Title')} </DialogTitle>
                    <DialogDescription>
                        {t('Description')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={refreshData} className={"bg-button"}>{t('RefreshButton')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}