import { Progress } from "@/components/ui/progress"

export default function FileProgress({ text, progress }) {
    return <Progress value={progress} text={text} />
}
