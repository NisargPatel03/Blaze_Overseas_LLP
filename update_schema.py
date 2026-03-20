import sys
import re

file_path = r"app\products\[category]\[slug]\ProductDetailClient.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update Specifications Table
# We will replace the static rows with dynamic mapping of product.detailedSpecs if available, else static
table_body_old = """              <tbody className="text-[14px] text-[#E8E1D9]/90">
                <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                  <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Shelf Life</td>
                  <td className="px-6 py-4">{product.shelfLife}</td>
                </tr>
                <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                  <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Moisture Content</td>
                  <td className="px-6 py-4">{product.moisture}</td>
                </tr>
                <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                  <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Purity (Min)</td>
                  <td className="px-6 py-4">{product.purity}</td>
                </tr>
                <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                  <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Color Designation</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <span className="w-3 h-3 block rounded-full" style={{ backgroundColor: product.color }} /> 
                    {product.color}
                  </td>
                </tr>
                <tr className="bg-[#1B1714]">
                  <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">HS Code</td>
                  <td className="px-6 py-4 font-mono text-[#F5A623]">{product.hsCode}</td>
                </tr>
              </tbody>"""

table_body_new = """              <tbody className="text-[14px] text-[#E8E1D9]/90">
                {product.detailedSpecs ? (
                  product.detailedSpecs.map((spec, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-[#1B1714]' : 'bg-[#201B17]'} ${idx === product.detailedSpecs!.length - 1 ? '' : 'border-b border-[#F5A623]/10'}`}>
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">{spec.label}</td>
                      <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: spec.value }} />
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Shelf Life</td>
                      <td className="px-6 py-4">{product.shelfLife}</td>
                    </tr>
                    <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Moisture Content</td>
                      <td className="px-6 py-4">{product.moisture}</td>
                    </tr>
                    <tr className="bg-[#1B1714] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Purity (Min)</td>
                      <td className="px-6 py-4">{product.purity}</td>
                    </tr>
                    <tr className="bg-[#201B17] border-b border-[#F5A623]/10">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">Color Designation</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <span className="w-3 h-3 block rounded-full" style={{ backgroundColor: product.color }} /> 
                        {product.color}
                      </td>
                    </tr>
                    <tr className="bg-[#1B1714]">
                      <td className="px-6 py-4 border-r border-[#F5A623]/10 font-medium">HS Code</td>
                      <td className="px-6 py-4 font-mono text-[#F5A623]">{product.hsCode}</td>
                    </tr>
                  </>
                )}
              </tbody>"""

c = c.replace(table_body_old, table_body_new)

# 2. Add Ingredients and Processing below Table if present
table_section_end = """          </div>
        </div>
      </section>"""

ingredients_section = """          </div>
          
          {(product.ingredients || product.processingDetails) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {product.ingredients && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🌿 Ingredients
                  </h3>
                  <div className="text-[#E8E1D9]/80 text-[14px] whitespace-pre-line leading-relaxed">
                    {product.ingredients}
                  </div>
                </div>
              )}
              {product.processingDetails && (
                <div className="bg-[#26201B] border border-[#F5A623]/20 rounded-xl p-6 shadow-lg">
                  <h3 className="text-[#F5A623] font-medium text-[15px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    🧼 Processing Details
                  </h3>
                  <ul className="text-[#E8E1D9]/80 text-[14px] leading-relaxed space-y-2 list-disc list-inside pl-4">
                    {product.processingDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>"""

c = c.replace(table_section_end, ingredients_section)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated ProductDetailClient.tsx layout for dynamic content.")
