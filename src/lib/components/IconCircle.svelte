<script lang="ts">
    interface Props {
        radius: number;
    }

    const { radius }: Props = $props();
</script>

<div class="icon-circle" style="--radius: {radius}px">
    <!-- Shopping Cart -->
    <div class="icon-wrapper" style="--rotation: 0deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    </div>
    <!-- Money/Dollar -->
    <div class="icon-wrapper" style="--rotation: 45deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23" /><path
                d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    </div>
    <!-- Tag -->
    <div class="icon-wrapper" style="--rotation: 90deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
    </div>
    <!-- Store -->
    <div class="icon-wrapper" style="--rotation: 135deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    </div>
    <!-- Credit Card -->
    <div class="icon-wrapper" style="--rotation: 180deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    </div>
    <!-- Package -->
    <div class="icon-wrapper" style="--rotation: 225deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line
                x1="12"
                y1="22.08"
                x2="12"
                y2="12" />
        </svg>
    </div>
    <!-- Wallet -->
    <div class="icon-wrapper" style="--rotation: 270deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path
                d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    </div>
    <!-- Exchange -->
    <div class="icon-wrapper" style="--rotation: 315deg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M21 12h-4l3-3-3-3h4M3 12h4l-3 3 3 3H3" />
            <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
    </div>
</div>

<style>
    .icon-circle {
        position: absolute;
        width: calc(var(--radius) * 2);
        height: calc(var(--radius) * 2);
        animation: spin 30s linear infinite;
        opacity: 0.3;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        pointer-events: none;
        overflow: visible;
    }

    .icon-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        margin: -20px;
        transform-origin: center;
        transform: rotate(var(--rotation))
            translateY(calc(var(--radius) * -0.88))
            rotate(calc(-1 * var(--rotation)));
    }

    .icon {
        width: 100%;
        height: 100%;
        color: hsl(var(--primary));
    }

    @keyframes spin {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
</style>
