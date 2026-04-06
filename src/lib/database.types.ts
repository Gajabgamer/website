export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calculator_requests: {
        Row: {
          id: string
          created_at: string
          pages: number
          seo_option: string
          marketing_option: string
          estimated_price: number
          currency: string
        }
        Insert: {
          id?: string
          created_at?: string
          pages: number
          seo_option: string
          marketing_option: string
          estimated_price: number
          currency: string
        }
        Update: {
          id?: string
          created_at?: string
          pages?: number
          seo_option?: string
          marketing_option?: string
          estimated_price?: number
          currency?: string
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          created_at: string
          business_name: string
          industry: string
          city: string
          email: string
          color_theme: string
        }
        Insert: {
          id?: string
          created_at?: string
          business_name: string
          industry: string
          city: string
          email: string
          color_theme: string
        }
        Update: {
          id?: string
          created_at?: string
          business_name?: string
          industry?: string
          city?: string
          email?: string
          color_theme?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          business: string
          industry: string
          city: string
          visit_count: number
          last_visit: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          business: string
          industry: string
          city: string
          visit_count?: number
          last_visit?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          business?: string
          industry?: string
          city?: string
          visit_count?: number
          last_visit?: string
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

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
    Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
    Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends { Insert: infer I } ? I : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends { Insert: infer I } ? I : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends { Update: infer U } ? U : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends { Update: infer U } ? U : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database["public"]["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never