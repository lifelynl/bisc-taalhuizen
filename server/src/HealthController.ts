import { Controller, Get } from '@nestjs/common'
import {
    HealthCheckService,
    // DNSHealthIndicator,
    HealthCheck,
    MemoryHealthIndicator,
    // DiskHealthIndicator,
} from '@nestjs/terminus'
import { PublicGuard } from './User/guards/PublicGuardDecorator'

@Controller('health')
export class HealthController {
    public constructor(
        private health: HealthCheckService,
        // private dns: DNSHealthIndicator,
        private memoryHealth: MemoryHealthIndicator // private diskHealth: DiskHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    @PublicGuard()
    public check() {
        return this.health.check([
            // () => this.dns.pingCheck('google', 'https://google.com', { timeout: 800 })
            // The process should not use more than 150MB memory
            () => this.memoryHealth.checkHeap('memory_heap', 150 * 1024 * 1024),
            // The process should not have more than 150MB allocated
            () => this.memoryHealth.checkRSS('memory_rss', 150 * 1024 * 1024),
            // The used disk storage should not exceed 250 GB
            // () => this.diskHealth.checkStorage('storage', { threshold: 250 * 1024 * 1024 * 1024, path: '/' }),
            // The used disk storage should not exceed 50% of the full disk size
            // () => this.diskHealth.checkStorage('storage', { thresholdPercent: 0.5, path: '/' }),
        ])
    }
}
