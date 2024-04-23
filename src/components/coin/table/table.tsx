import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'

export const Table = ({ children }: PropsWithChildren<ReactNode>) => (
  <div className="min-w-full overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  </div>
)
