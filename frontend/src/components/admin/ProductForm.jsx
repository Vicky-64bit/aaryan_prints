import { useState } from "react";
export default function ProductForm ({ initial = {}, onCancel, onSave }){
  const [title, setTitle] = useState(initial.title || "");
  const [price, setPrice] = useState(initial.price || 0);
  const [category, setCategory] = useState(initial.category || "Men");
  const [desc, setDesc] = useState(initial.description || "");
  const [sizesText, setSizesText] = useState((initial.sizes||[]).join(","));
  const [stockText, setStockText] = useState(Object.entries(initial.stock||{}).map(([k,v])=>`${k}:${v}`).join(","));
  const [imagesText, setImagesText] = useState((initial.images||[]).join(","));

  const handleSave = () => {
    const sizes = sizesText.split(",").map(s=>s.trim()).filter(Boolean);
    const stock = {};
    stockText.split(",").map(r=>r.split(":" )).forEach(([k,v])=>{ if(k) stock[k.trim()]=Number(v||0); });
    const images = imagesText.split(",").map(s=>s.trim()).filter(Boolean);
    onSave({ title, price: Number(price), category, description: desc, sizes, stock, images });
  };

  return (
    <div className="text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div>
          <label className="text-sm">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="text-sm">Price</label>
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="text-sm">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-2 py-1 border rounded">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
            <option>Accessories</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Sizes (comma separated)</label>
          <input value={sizesText} onChange={e=>setSizesText(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Description</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="text-sm">Stock (size:qty, comma separated)</label>
          <input value={stockText} onChange={e=>setStockText(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="text-sm">Images (comma separated URLs)</label>
          <input value={imagesText} onChange={e=>setImagesText(e.target.value)} className="w-full px-2 py-1 border rounded" />
        </div>
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  );
}
