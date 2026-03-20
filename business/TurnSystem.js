export default class TurnSystem {
    constructor(onTurn, onTick = null, intervalMs = 5000) {
        this._onTurn = onTurn;
        this._onTick = onTick;
        this._intervalMs = intervalMs;

        this._tickIntervalId = null;
        this._isRunning = false;
        this._remainingMs = intervalMs;
        this._lastTickTime = null;
    }

    get intervalMs() {
        return this._intervalMs;
    }

    get isRunning() {
        return this._isRunning;
    }

    get remainingMs() {
        return this._remainingMs;
    }

    set intervalMs(newIntervalMs) {
        this._intervalMs = newIntervalMs;
        this._remainingMs = newIntervalMs;
    }

    start() {
        if (this._isRunning) {
            return;
        }

        this._isRunning = true;
        this._lastTickTime = Date.now();

        this._tickIntervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = now - this._lastTickTime;
            this._lastTickTime = now;

            this._remainingMs -= elapsed;

            if (this._remainingMs <= 0) {
                this.executeTurn();
                this._remainingMs = this._intervalMs;
            }

            if (typeof this._onTick === "function") {
                this._onTick(Math.ceil(this._remainingMs / 1000));
            }
        }, 200);
    }

    stop() {
        if (!this._isRunning) {
            return;
        }

        clearInterval(this._tickIntervalId);
        this._tickIntervalId = null;
        this._isRunning = false;
    }

    reset() {
        this._remainingMs = this._intervalMs;

        if (typeof this._onTick === "function") {
            this._onTick(Math.ceil(this._remainingMs / 1000));
        }
    }

    executeTurn() {
        if (typeof this._onTurn === "function") {
            this._onTurn();
        }
    }
}