import { Progress } from "@/components/ui/progress"

export default function DownloadFileProgress({ text, progress }) {
    return <Progress value={progress} text={text} />
}
