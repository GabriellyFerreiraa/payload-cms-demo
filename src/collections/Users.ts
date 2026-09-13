import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
  },
  access: {
    // Signup stays public, but the `role` field below is locked down
    // separately — no one becomes admin just by registering.
    create: () => true,
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        // Only an existing admin can set/change this field.
        // One exception: the collection is still empty (bootstrap of
        // the very first admin account), mirroring how Payload's own
        // admin panel gates the "create first user" screen.
        create: async ({ req }) => {
          if (req.user?.role === 'admin') return true
          const { totalDocs } = await req.payload.count({ collection: 'users' })
          return totalDocs === 0
        },
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
