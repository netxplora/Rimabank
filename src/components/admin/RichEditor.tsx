import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your publication content here...",
  minHeight = "240px"
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (tagStart: string, tagEnd: string = '') => {
    const textarea = document.getElementById('rich-editor-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${tagStart}${selectedText || 'text'}${tagEnd}`;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + replacement.length - tagEnd.length);
    }, 50);
  };

  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden bg-white focus-within:border-[#0284c7] transition-all">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#f8fafc] border-b border-[#e2e8f0] flex-wrap gap-1">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => insertTag('<strong>', '</strong>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs font-bold"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<em>', '</em>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs italic"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <div className="h-4 w-[1px] bg-[#cbd5e1] mx-1" />
          <button
            type="button"
            onClick={() => insertTag('<h3>', '</h3>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs font-semibold"
            title="Heading 3"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<h4>', '</h4>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs font-semibold"
            title="Heading 4"
          >
            <Heading3 className="h-4 w-4" />
          </button>
          <div className="h-4 w-[1px] bg-[#cbd5e1] mx-1" />
          <button
            type="button"
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs"
            title="Unordered List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ol>\n  <li>', '</li>\n</ol>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs"
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<blockquote>', '</blockquote>')}
            className="p-1.5 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<p>', '</p>')}
            className="px-2 py-1 rounded hover:bg-[#e2e8f0] text-[#0a1e3f] transition-all text-xs font-mono font-medium"
            title="Paragraph"
          >
            &lt;p&gt;
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setIsPreview(!isPreview)}
            className="h-7 text-xs px-2.5 text-[#0a1e3f] hover:bg-[#e2e8f0]"
          >
            {isPreview ? (
              <>
                <Edit3 className="h-3.5 w-3.5 mr-1 text-[#0284c7]" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 mr-1 text-[#0284c7]" />
                Preview Mode
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor Content Area */}
      {isPreview ? (
        <div
          className="p-4 text-xs sm:text-sm text-[#0a1e3f] leading-relaxed prose max-w-none min-h-[240px] bg-white overflow-y-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value || '<p className="text-gray-400 italic">Nothing to preview yet.</p>') }}
        />
      ) : (
        <textarea
          id="rich-editor-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-xs sm:text-sm text-[#0a1e3f] font-mono leading-relaxed bg-white border-0 outline-none resize-y"
          style={{ minHeight }}
        />
      )}
    </div>
  );
};
