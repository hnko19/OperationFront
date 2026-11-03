import React from 'react';

export interface TreeNodeData {
  id: string | number;
  title: string;
  subtitle?: string;
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  isRoot?: boolean;
}

export const OrgTreeNode: React.FC<TreeNodeProps> = ({ node, isRoot = false }) => {
  const hasChildren = Boolean(node.children && node.children.length > 0);

  return (
    <li className="relative flex flex-col items-center p-0 list-none">
      {/* خط الربط العمودي القادم من العقدة الأب (لا يظهر للجذر) */}
      {!isRoot && (
        <div className="w-px h-6 bg-slate-300"></div>
      )}

      {/* بطاقة العقدة (Node Card) */}
      <div className="z-10 flex flex-col items-center justify-center min-w-[150px] max-w-[220px] px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-center">
        <span className="text-sm font-semibold text-slate-800">{node.title}</span>
        {node.subtitle && (
          <span className="text-xs text-slate-500 mt-0.5">{node.subtitle}</span>
        )}
      </div>

      {/* الأبناء والخطوط التوصيلية */}
      {hasChildren && (
        <div className="flex flex-col items-center w-full">
          {/* خط عمودي نازل من العقدة الحالية */}
          <div className="w-px h-6 bg-slate-300"></div>

          {/* الحاوية الأفقية للأبناء */}
          <ul className="flex items-start justify-center gap-6 relative pt-0">
            {node.children!.map((child, index) => {
              const count = node.children!.length;
              const isFirst = index === 0;
              const isLast = index === count - 1;
              const isOnly = count === 1;

              return (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* خط الربط الأفقي أعلى الابن */}
                  {!isOnly && (
                    <div
                      className={`absolute top-0  h-px bg-slate-300 ${
                        isFirst
                          ? 'left-1/2 right-0'
                          : isLast
                          ? 'left-0 right-1/2'
                          : 'left-0 right-0'
                      }`}
                    />
                  )}

                  {/* استدعاء المكون بشكل تكراري (Recursive) */}
                  <OrgTreeNode node={child} />
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};