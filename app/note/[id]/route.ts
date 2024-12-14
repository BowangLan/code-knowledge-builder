import { NextResponse } from 'next/server'
import { db } from '@/app/note/lib/db'
import { document } from '@/lib/db/schema'

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const now = new Date()

        const addResult = await db.insert(document).values({
            id: params.id,
            createdAt: now,
            title: 'Test Note',
            content: 'This is a test note',
            userId: 'test-user-id'  // This needs to be a valid UUID from your users table
        }).returning()

        const deleteResult = await db
            .delete(document)
            .returning()

        return NextResponse.json({
            added: addResult[0],
            deleted: deleteResult.length > 0,
            message: 'Test complete - note was added and deleted'
        })
    } catch (error: unknown) {
        console.error('Error:', error)
        return NextResponse.json(
            {
                message: 'Error in test',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}