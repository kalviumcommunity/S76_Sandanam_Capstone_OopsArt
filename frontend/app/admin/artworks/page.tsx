"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

type Item = {
	id: string
	_id?: string
	name: string
	quantity: number
	createdAt?: string
}

export default function ManageArtworksPage() {
	const apiBase = useMemo(
		() => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000",
		[]
	)
	const [items, setItems] = useState<Item[]>([])
	const [loading, setLoading] = useState(false)
	const [creating, setCreating] = useState(false)
	const [updatingId, setUpdatingId] = useState<string | null>(null)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const [newName, setNewName] = useState("")
	const [newQty, setNewQty] = useState<number>(1)

	const [editItem, setEditItem] = useState<Item | null>(null)

	const fetchItems = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${apiBase}/api/items`, { cache: "no-store" })
			if (!res.ok) throw new Error("Failed to load items")
			const data = await res.json()
			const normalized: Item[] = data.map((d: any) => ({
				id: d._id,
				...d
			}))
			setItems(normalized)
	+	} catch (err: any) {
			toast.error(err.message || "Error loading artworks")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchItems()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const createItem = async () => {
		if (!newName.trim()) {
			toast.error("Name is required")
			return
		}
		setCreating(true)
		try {
			const res = await fetch(`${apiBase}/api/items`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newName.trim(), quantity: Number(newQty) || 0 })
			})
			if (!res.ok) throw new Error("Failed to create")
			setNewName("")
			setNewQty(1)
			toast.success("Artwork created")
			fetchItems()
		} catch (err: any) {
			toast.error(err.message || "Create failed")
		} finally {
			setCreating(false)
		}
	}

	const startEdit = (item: Item) => {
		setEditItem({ ...item })
	}

	const saveEdit = async () => {
		if (!editItem) return
		setUpdatingId(editItem.id)
		try {
			const res = await fetch(`${apiBase}/api/items/${editItem.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: editItem.name, quantity: Number(editItem.quantity) || 0 })
			})
			if (!res.ok) throw new Error("Failed to update")
			toast.success("Artwork updated")
			setEditItem(null)
			fetchItems()
		} catch (err: any) {
			toast.error(err.message || "Update failed")
		} finally {
			setUpdatingId(null)
		}
	}

	const deleteItem = async (id: string) => {
		setDeletingId(id)
		try {
			const res = await fetch(`${apiBase}/api/items/${id}`, { method: "DELETE" })
			if (!res.ok && res.status !== 204) throw new Error("Failed to delete")
			toast.success("Artwork deleted")
			fetchItems()
		} catch (err: any) {
			toast.error(err.message || "Delete failed")
		} finally {
			setDeletingId(null)
		}
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Manage Artworks</h1>
				<p className="text-muted-foreground">Create, update, and remove artworks.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Add New Artwork</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-3">
					<div className="grid gap-2">
						<Label htmlFor="new-name">Name</Label>
						<Input
							id="new-name"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="Artwork name"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="new-qty">Quantity</Label>
						<Input
							id="new-qty"
							type="number"
							value={newQty}
							onChange={(e) => setNewQty(Number(e.target.value))}
							placeholder="0"
						/>
					</div>
					<div className="flex items-end">
						<Button onClick={createItem} disabled={creating}>
							{creating ? "Creating..." : "Create"}
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Artworks</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead className="w-[120px]">Quantity</TableHead>
								<TableHead className="w-[220px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={3}>Loading...</TableCell>
								</TableRow>
							) : items.length === 0 ? (
								<TableRow>
									<TableCell colSpan={3} className="text-muted-foreground">
										No artworks yet.
									</TableCell>
								</TableRow>
							) : (
								items.map((it) => (
									<TableRow key={it.id}>
										<TableCell>{it.name}</TableCell>
										<TableCell>{it.quantity}</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Dialog open={editItem?.id === it.id} onOpenChange={(o) => !o && setEditItem(null)}>
													<DialogTrigger asChild>
														<Button variant="outline" onClick={() => startEdit(it)}>
															Edit
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Edit Artwork</DialogTitle>
														</DialogHeader>
														<div className="grid gap-4">
															<div className="grid gap-2">
																<Label htmlFor="edit-name">Name</Label>
																<Input
																	id="edit-name"
																	value={editItem?.name || ""}
																	onChange={(e) =>
																		setEditItem((prev) => (prev ? { ...prev, name: e.target.value } : prev))
																	}
																/>
															</div>
															<div className="grid gap-2">
																<Label htmlFor="edit-qty">Quantity</Label>
																<Input
																	id="edit-qty"
																	type="number"
																	value={editItem?.quantity ?? 0}
																	onChange={(e) =>
																		setEditItem((prev) =>
																			prev ? { ...prev, quantity: Number(e.target.value) } : prev
																		)
																	}
																/>
															</div>
														</div>
														<DialogFooter>
															<Button
																onClick={saveEdit}
																disabled={updatingId === it.id}
															>
																{updatingId === it.id ? "Saving..." : "Save changes"}
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
												<Button
													variant="destructive"
													onClick={() => deleteItem(it.id)}
													disabled={deletingId === it.id}
												>
													{deletingId === it.id ? "Removing..." : "Remove"}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}


