
import {  OrgTreeNode, type TreeNodeData } from '../Components/Tree/TreeNode';

const orgChartData: TreeNodeData = {
  id: 1,
  title: 'الإدارة العليا',
  subtitle: 'المدير العام',
  children: [
    {
      id: 2,
      title: 'إدارة تقنية المعلومات',
      subtitle: 'مدير الإدارة',
      children: [
        {
          id: 4,
          title: 'قسم البرمجيات',
          subtitle: 'رئيس قسم',
          children: [
            { id: 7, title: 'وحدة الـ Frontend' },
            { id: 8, title: 'وحدة الـ Backend' },
          ],
        },
        {
          id: 5,
          title: 'قسم الشبكات والبنية التحتية',
          subtitle: 'رئيس قسم',
          children: [
            { id: 9, title: 'وحدة الصيانة والدعم' },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'إدارة الموارد البشرية',
      subtitle: 'مدير الإدارة',
      children: [
        { id: 6, title: 'قسم التوظيف' },
      ],
    },
  ],
};

export default function OrgChartApp() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center overflow-x-auto" dir="rtl">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">الهيكل التنظيمي للمؤسسة</h1>
      
      {/* حاوية الشجرة مع تمرير أفقي مريح */}
      <div className="inline-block p-6 bg-slate-50/50 rounded-2xl">
        <ul className="flex justify-center p-0 m-0">
          <OrgTreeNode node={orgChartData} isRoot={true} />
        </ul>
      </div>
    </div>
  );
}