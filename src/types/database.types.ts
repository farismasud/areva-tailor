export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          category: string | null
          image_url: string | null
          is_active: boolean
          created_at: string
          price_starting_at?: number | null
          fabric_origin?: string | null
          featured?: boolean | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          price_starting_at?: number | null
          fabric_origin?: string | null
          featured?: boolean | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          price_starting_at?: number | null
          fabric_origin?: string | null
          featured?: boolean | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          service_type: string
          preferred_date: string | null
          preferred_time: string | null
          notes: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone: string
          service_type: string
          preferred_date?: string | null
          preferred_time?: string | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string
          service_type?: string
          preferred_date?: string | null
          preferred_time?: string | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
