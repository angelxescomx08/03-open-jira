interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-Progress: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'in-progress',
            createdAt: Date.now() - 50004
        },
        {
            description: 'Completadas: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'finished',
            createdAt: Date.now() - 88888
        }
    ]
}