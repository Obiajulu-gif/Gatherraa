"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  Layers,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  WalletCards,
  XCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type TicketStatus = "active" | "used" | "expired";

type OwnedTicket = {
  id: string;
  ticketCode: string;
  tier: string;
  status: TicketStatus;
  mintedAt: string;
  usedAt?: string;
  expiresAt: string;
  holderName: string;
  event: {
    id: string;
    title: string;
    type: "Conference" | "Workshop" | "Summit" | "Meetup";
    category: string;
    date: string;
    venue: string;
    organizer: string;
  };
  nft: {
    tokenId: string;
    collection: string;
    contract: string;
    rarity: "Common" | "Rare" | "Epic" | "Legendary";
    accent: string;
  };
};

type EventGroup = {
  event: OwnedTicket["event"];
  tickets: OwnedTicket[];
};

const ownedTickets: OwnedTicket[] = [
  {
    id: "ticket-001",
    ticketCode: "GTH-ETHLAG-0241",
    tier: "VIP Access",
    status: "active",
    mintedAt: "2026-05-10T10:30:00.000Z",
    expiresAt: "2026-08-14T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-eth-lagos",
      title: "Ethereum Lagos Builder Conference",
      type: "Conference",
      category: "Blockchain",
      date: "2026-08-12T09:00:00.000Z",
      venue: "Landmark Centre, Lagos",
      organizer: "Gathera Africa",
    },
    nft: {
      tokenId: "#4821",
      collection: "Gathera Genesis Pass",
      contract: "0x8A2...9f11",
      rarity: "Epic",
      accent: "from-blue-500 via-indigo-500 to-violet-600",
    },
  },
  {
    id: "ticket-002",
    ticketCode: "GTH-ETHLAG-0242",
    tier: "General Admission",
    status: "active",
    mintedAt: "2026-05-18T14:45:00.000Z",
    expiresAt: "2026-08-14T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-eth-lagos",
      title: "Ethereum Lagos Builder Conference",
      type: "Conference",
      category: "Blockchain",
      date: "2026-08-12T09:00:00.000Z",
      venue: "Landmark Centre, Lagos",
      organizer: "Gathera Africa",
    },
    nft: {
      tokenId: "#4822",
      collection: "Gathera Genesis Pass",
      contract: "0x8A2...9f11",
      rarity: "Rare",
      accent: "from-cyan-500 via-blue-500 to-sky-600",
    },
  },
  {
    id: "ticket-003",
    ticketCode: "GTH-MOVE-1180",
    tier: "Builder Seat",
    status: "used",
    mintedAt: "2026-03-01T09:15:00.000Z",
    usedAt: "2026-03-22T11:04:00.000Z",
    expiresAt: "2026-03-23T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-move-workshop",
      title: "Move Language Technical Workshop",
      type: "Workshop",
      category: "Developer Education",
      date: "2026-03-22T10:00:00.000Z",
      venue: "Innovation Hub, Enugu",
      organizer: "Sui Builders Guild",
    },
    nft: {
      tokenId: "#1180",
      collection: "Builder Workshop Badge",
      contract: "0x25D...A10c",
      rarity: "Legendary",
      accent: "from-emerald-500 via-teal-500 to-cyan-600",
    },
  },
  {
    id: "ticket-004",
    ticketCode: "GTH-STELLAR-7822",
    tier: "Hackathon Pass",
    status: "active",
    mintedAt: "2026-06-07T16:40:00.000Z",
    expiresAt: "2026-07-05T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-stellar-summit",
      title: "Stellar Soroban Startup Summit",
      type: "Summit",
      category: "Startup",
      date: "2026-07-03T08:30:00.000Z",
      venue: "Civic Centre, Abuja",
      organizer: "Stellar Nigeria",
    },
    nft: {
      tokenId: "#7822",
      collection: "Soroban Summit Access",
      contract: "0x77B...21dE",
      rarity: "Epic",
      accent: "from-purple-500 via-fuchsia-500 to-pink-600",
    },
  },
  {
    id: "ticket-005",
    ticketCode: "GTH-WEB3MEET-0098",
    tier: "Community Pass",
    status: "expired",
    mintedAt: "2025-11-19T07:20:00.000Z",
    expiresAt: "2025-12-02T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-web3-meetup",
      title: "Web3 Community Night",
      type: "Meetup",
      category: "Community",
      date: "2025-12-01T17:00:00.000Z",
      venue: "Tech Park, Yaba",
      organizer: "Gathera Community",
    },
    nft: {
      tokenId: "#0098",
      collection: "Community Access Badge",
      contract: "0x61C...55F0",
      rarity: "Common",
      accent: "from-zinc-500 via-slate-500 to-gray-600",
    },
  },
  {
    id: "ticket-006",
    ticketCode: "GTH-AIFIN-6102",
    tier: "Investor Lounge",
    status: "active",
    mintedAt: "2026-06-11T13:50:00.000Z",
    expiresAt: "2026-06-29T23:59:59.000Z",
    holderName: "Alex Rivera",
    event: {
      id: "event-ai-finance",
      title: "AI x Finance Builders Meetup",
      type: "Meetup",
      category: "Fintech",
      date: "2026-06-28T15:00:00.000Z",
      venue: "Victoria Island, Lagos",
      organizer: "Fintech Builders Club",
    },
    nft: {
      tokenId: "#6102",
      collection: "Fintech Builders Pass",
      contract: "0x19F...03Ba",
      rarity: "Rare",
      accent: "from-amber-500 via-orange-500 to-red-600",
    },
  },
];

const dateFilters = [
  { label: "All dates", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "This month", value: "this-month" },
  { label: "Past", value: "past" },
] as const;

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

const formatDateTime = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));

const getStatusMeta = (status: TicketStatus) => {
  switch (status) {
    case "active":
      return {
        label: "Active",
        icon: CheckCircle2,
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
        dot: "bg-emerald-500",
      };
    case "used":
      return {
        label: "Used",
        icon: ShieldCheck,
        badge: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30",
        dot: "bg-blue-500",
      };
    case "expired":
      return {
        label: "Expired",
        icon: XCircle,
        badge: "bg-zinc-100 text-zinc-700 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700",
        dot: "bg-zinc-400",
      };
  }
};

const isTicketInDateFilter = (ticket: OwnedTicket, filter: string) => {
  if (filter === "all") {
    return true;
  }

  const eventDate = new Date(ticket.event.date);
  const now = new Date();

  if (filter === "upcoming") {
    return eventDate >= now;
  }

  if (filter === "past") {
    return eventDate < now;
  }

  if (filter === "this-month") {
    return (
      eventDate.getFullYear() === now.getFullYear() &&
      eventDate.getMonth() === now.getMonth()
    );
  }

  return true;
};

export default function DashboardPage() {
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const eventTypes = useMemo(() => {
    return Array.from(new Set(ownedTickets.map((ticket) => ticket.event.type))).sort();
  }, []);

  const filteredTickets = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return ownedTickets.filter((ticket) => {
      const matchesEventType =
        eventTypeFilter === "all" || ticket.event.type === eventTypeFilter;
      const matchesDate = isTicketInDateFilter(ticket, dateFilter);
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          ticket.ticketCode,
          ticket.tier,
          ticket.event.title,
          ticket.event.venue,
          ticket.event.organizer,
          ticket.nft.collection,
          ticket.nft.tokenId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesEventType && matchesDate && matchesStatus && matchesSearch;
    });
  }, [dateFilter, eventTypeFilter, searchQuery, statusFilter]);

  const groupedTickets = useMemo<EventGroup[]>(() => {
    const groups = filteredTickets.reduce<Record<string, EventGroup>>(
      (accumulator, ticket) => {
        if (!accumulator[ticket.event.id]) {
          accumulator[ticket.event.id] = {
            event: ticket.event,
            tickets: [],
          };
        }

        accumulator[ticket.event.id].tickets.push(ticket);
        return accumulator;
      },
      {},
    );

    return Object.values(groups).sort(
      (a, b) =>
        new Date(a.event.date).getTime() - new Date(b.event.date).getTime(),
    );
  }, [filteredTickets]);

  const statusCounts = useMemo(() => {
    return ownedTickets.reduce(
      (counts, ticket) => {
        counts[ticket.status] += 1;
        return counts;
      },
      { active: 0, used: 0, expired: 0 } as Record<TicketStatus, number>,
    );
  }, []);

  const totalEvents = new Set(ownedTickets.map((ticket) => ticket.event.id)).size;
  const nextActiveTicket = filteredTickets
    .filter((ticket) => ticket.status === "active")
    .sort(
      (a, b) =>
        new Date(a.event.date).getTime() - new Date(b.event.date).getTime(),
    )[0];

  return (
    <DashboardLayout
      navbarTitle="My Tickets"
      navbarActions={[
        { id: "tickets", icon: Ticket, label: "Owned tickets", badge: ownedTickets.length },
      ]}
      navbarUser={{
        name: "Alex Rivera",
        email: "alex@gatherraa.ai",
        initials: "AR",
      }}
    >
      <div className="space-y-8">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:text-blue-200">
                <WalletCards className="h-3.5 w-3.5" />
                Wallet ticket dashboard
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
                  Tickets owned across your events
                </h1>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
                  Grouped by event, with live ownership status, NFT pass previews,
                  and filters for event type, event date, and ticket lifecycle.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/70 lg:min-w-72">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Next active ticket
              </p>
              {nextActiveTicket ? (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {nextActiveTicket.event.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(nextActiveTicket.event.date)}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {nextActiveTicket.tier} · {nextActiveTicket.ticketCode}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                  No active ticket matches the current filters.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Ticket}
            label="Total tickets"
            value={ownedTickets.length.toString()}
            helper={`${totalEvents} grouped events`}
          />
          <StatCard
            icon={CheckCircle2}
            label="Active"
            value={statusCounts.active.toString()}
            helper="Ready for admission"
          />
          <StatCard
            icon={ShieldCheck}
            label="Used"
            value={statusCounts.used.toString()}
            helper="Already checked in"
          />
          <StatCard
            icon={Clock3}
            label="Expired"
            value={statusCounts.expired.toString()}
            helper="Past access window"
          />
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                <Filter className="h-4 w-4 text-primary" />
                Ticket filters
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Showing {filteredTickets.length} ticket{filteredTickets.length === 1 ? "" : "s"} across {groupedTickets.length} event{groupedTickets.length === 1 ? "" : "s"}.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
              <Download className="h-4 w-4" />
              Export tickets
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search event, NFT, tier, or code"
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                type="search"
              />
            </label>

            <select
              value={eventTypeFilter}
              onChange={(event) => setEventTypeFilter(event.target.value)}
              className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label="Filter by event type"
            >
              <option value="all">All event types</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label="Filter by date"
            >
              {dateFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as TicketStatus | "all")
              }
              className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              aria-label="Filter by ticket status"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="used">Used</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </section>

        <section className="space-y-5">
          {groupedTickets.length > 0 ? (
            groupedTickets.map((group) => (
              <EventTicketGroup key={group.event.id} group={group} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
              <Layers className="mx-auto h-10 w-10 text-zinc-400" />
              <h2 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                No tickets found
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Adjust your event type, date, status, or search filters to see matching owned tickets.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-zinc-50">{value}</p>
        </div>
        <div className="rounded-2xl bg-primary-muted p-3 text-primary dark:text-blue-200">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">{helper}</p>
    </div>
  );
}

function EventTicketGroup({ group }: { group: EventGroup }) {
  const counts = group.tickets.reduce(
    (accumulator, ticket) => {
      accumulator[ticket.status] += 1;
      return accumulator;
    },
    { active: 0, used: 0, expired: 0 } as Record<TicketStatus, number>,
  );

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary-muted px-3 py-1 text-xs font-semibold text-primary dark:text-blue-200">
                {group.event.type}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-800">
                {group.event.category}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                {group.event.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {formatDate(group.event.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" /> {group.event.organizer}
                </span>
                <span>{group.event.venue}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-zinc-200 bg-white p-2 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <MiniCount label="Active" value={counts.active} />
            <MiniCount label="Used" value={counts.used} />
            <MiniCount label="Expired" value={counts.expired} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
        {group.tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </article>
  );
}

function MiniCount({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-20 rounded-xl px-3 py-2">
      <p className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: OwnedTicket }) {
  const status = getStatusMeta(ticket.status);
  const StatusIcon = status.icon;

  return (
    <div className="grid gap-4 rounded-2xl border border-zinc-200 p-4 transition hover:border-primary/40 hover:shadow-md dark:border-zinc-800 dark:hover:border-primary/50 sm:grid-cols-[9rem_1fr]">
      <div className={`relative min-h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${ticket.nft.accent} p-4 text-white shadow-inner`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.2),_transparent_26%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Sparkles className="h-5 w-5" />
            <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur">
              {ticket.nft.rarity}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              NFT Ticket
            </p>
            <p className="mt-1 text-2xl font-black">{ticket.nft.tokenId}</p>
            <p className="mt-1 text-xs text-white/80">{ticket.nft.collection}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                {ticket.tier}
              </h3>
              <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {ticket.ticketCode}
              </p>
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${status.badge}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </span>
          </div>

          <div className="grid gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
              <Calendar className="h-4 w-4 text-zinc-400" />
              {formatDate(ticket.event.date)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
              <Clock3 className="h-4 w-4 text-zinc-400" />
              Expires {formatDate(ticket.expiresAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>Minted {formatDate(ticket.mintedAt)}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
            <QrCode className="h-3.5 w-3.5" />
            {ticket.nft.contract}
          </span>
        </div>
      </div>
    </div>
  );
}
