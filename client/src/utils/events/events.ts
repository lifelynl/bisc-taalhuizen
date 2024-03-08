// NOTE: this is a hack and it's use should be avoided
export function bubbleToFormElement(ref: React.RefObject<any>) {
    const input = ref.current as any
    const lastValue = input.value
    input.value = 'new value'
    const event = new Event('input', { bubbles: true }) as any
    event.simulated = true
    const tracker = input._valueTracker
    if (tracker) {
        tracker.setValue(lastValue)
    }
    input.dispatchEvent(event)
}
