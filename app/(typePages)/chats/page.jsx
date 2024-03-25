import EntityPage from '@/components/entity/EntityPage';


export default function Chats() {
    return (
        <div>
            <EntityPage 
                text="Hello, my name is John Doe. I work at Google and I live in New York." 
                entities={[
                    { label: 'person', offset: 18, length: 8 },
                    { label: 'organization', offset: 38, length: 6 },
                    { label: 'location', offset: 59, length: 8 }
                ]}
            />
        </div>
    )
}
