export type TWarningWindow = {
  title: string
  id: number
  hideWarningWindow: () => void
  getData: () => Promise<void>
}
