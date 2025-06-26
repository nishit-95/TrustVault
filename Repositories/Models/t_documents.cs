using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Repositories.Models
{
    public class t_documents
    {
        public int c_document_id { get; set; }
        public int c_user_id { get; set; }
        public int? c_data_id { get; set; }
        public string c_document_name { get; set; }
        public string? c_file_url { get; set; }
        public string? c_mime_type { get; set; }
        public bool c_is_active { get; set; }
        public DateTime c_uploaded_at { get; set; }
        public IFormFile c_file { get; set; } // For file upload handling
    }

}